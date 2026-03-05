---
name: Agile Robotics for Industrial Automation Competition (ARIAC)
tools: [ROS2, C++, YOLOv8, Gazebo, RViz, UR10e, AGV, MoveIt2, ARUCO]
image: https://raw.githubusercontent.com/vishnumandala/Agile-Robotics-for-Industrial-Automation-Competition-ARIAC-Project/main/results/demo.gif
description: NIST-compliant control system for six UR10e robots and AGVs in a warehouse environment with advanced part detection and fault-tolerant architecture.
---

<a href="{{ site.baseurl }}/projects/" class="back-button" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: inherit;">
    <i class="fas fa-arrow-left" style="margin-right: 5px;"></i> Back to Projects
</a>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0;"><strong>Agile Robotics for Industrial Automation Competition (ARIAC)</strong></h1>
    <a href="https://github.com/vishnumandala/Agile-Robotics-for-Industrial-Automation-Competition-ARIAC-Project" 
        class="github-link"
       style="text-decoration: none; background-color: #f5f5f5; padding: 10px 15px; border-radius: 8px; transition: all 0.3s ease;">
        <i class="fab fa-github fa-2x" style="color: #333333; transition: color 0.3s ease;"></i>
        <style>
            a:hover {
                background-color: #333333 !important;
            }
            .github-link:hover i {
                color: #ffffff !important;
            }
            .back-button:hover {
                background-color: transparent !important;
            }
        </style>
    </a>
</div>

<p class="post-metadata text-muted">
   <span class="d-inline-block">May 15, 2024</span> &#8226; 
   <span class="tags">
      {% for tag in page.tools %}
      <span class="tag badge badge-pill text-primary border border-primary">{{ tag }}</span>
      {% endfor %}
    </span>
</p>

<div style="text-align: center; margin: 30px 0;">
    <img src="https://raw.githubusercontent.com/vishnumandala/Agile-Robotics-for-Industrial-Automation-Competition-ARIAC-Project/main/results/demo.gif" 
         alt="ARIAC Competition Demo"
         style="width: 90%; max-width: 1200px; margin: auto;"
    />
</div>

## Project Overview

This project develops a Competitor Control System (CCS) for the **Agile Robotics for Industrial Automation Competition (ARIAC)**. The ARIAC competition challenges participants to build agile and adaptive robotic solutions in a simulated manufacturing environment. Specifically, we focus on the kitting task, where parts of various types and colors must be picked and placed into trays on Automated Guided Vehicles (AGVs).

Key features of our system:
- **ROS2 (Galactic)** as the core middleware
- **Gazebo** for physics-based simulation
- **MoveIt2** for path planning and motion execution
- **YOLOv8** for object detection of parts in RGB images
- **ARUCO markers** for tray identification and pose estimation
- **UR10e** robotic arm for pick-and-place
- **Python and C++** integration to leverage both high-level logic and fast, robust motion services

## ARIAC Environment

The ARIAC environment simulates an **order-fulfillment workcell** where a combination of robots, sensors, and AGVs collaborate to pick and place parts in trays. Below are the key components of the environment:

1. **Robots**  
   - **Floor Robot (UR10e)**: Mounted on a rail for extended reach, used primarily for kitting tasks.  
   - **Ceiling Robot (UR10e)**: Mounted overhead, not utilized in our solution but available in the environment for assembly tasks.

2. **Parts and Bins**  
   - Four **part types** (Battery, Pump, Sensor, Regulator)  
   - Each part type available in **five colors**  
   - Parts stored in **multiple bins** around the workcell

3. **AGVs**  
   - Four AGVs are used to transport trays once kitted  
   - Each AGV can dock at a station for loading/unloading

4. **Kit Trays**  
   - Each tray has a unique **ARUCO fiducial marker** for identification  
   - Trays contain multiple quadrants for part placement

5. **Sensor Setup**  
   - **Basic Logical Cameras (BLC)** for precise part pose estimation  
   - **RGB Cameras** for part type/color detection and ARUCO marker tracking  
   - **Quality Control Sensors** to detect faulty parts (orientation, missing items, defects)

6. **Tool Changer and Gripper Types**  
   - A **tray gripper** to pick trays  
   - A **part gripper** to pick parts  
   - A dedicated station to switch between grippers

7. **Disposal Bin**  
   - A special bin for discarding faulty or incorrect parts

8. **Orders**  
   - Orders arrive with a priority level, specifying required parts, colors, and tray IDs  
   - High-priority orders can interrupt normal orders

In this environment, robots must adapt to **agility challenges** such as unexpected faulty parts, gripper malfunctions, or insufficient parts in bins, while ensuring timely order completion.

## Architecture Overview

Our CCS implements a **hybrid hierarchical-reactive** design, ensuring a structured approach to task planning while allowing real-time reactivity to agility challenges.

1. **Order Management**  
   - Receives orders on `/ariac/orders`  
   - Maintains separate queues for **high-priority** and **normal** orders  
   - Spawns a dedicated thread to monitor new orders and reorder tasks if needed

2. **Perception Module**  
   - Subscribes to camera topics for part pose (`Basic Logical Camera`) and type/color (`YOLOv8` in Python)  
   - Identifies trays via ARUCO markers  
   - Performs quality checks via a ROS2 service `/ariac/perform_quality_check`

3. **Floor Robot Control**  
   - Implemented in C++ for robust and fast motion services  
   - Provides custom services for picking and placing parts/trays:
     - `/pick_part_bin`  
     - `/place_part_tray`  
     - `/release_part_on_tray`  
     - `/drop_part_in_trash`  
     - `/change_gripper`  
   - Uses **MoveIt2** for path planning and collision checking

4. **Agility Challenges Handling**  
   - **High-Priority Orders**: Suspend current task and switch to urgent order  
   - **Faulty Parts**: Discard and replace if available  
   - **Faulty Gripper**: Retry picking dropped parts, detect via `/ariac/floor_robot_gripper_state`  
   - **Insufficient Parts**: Submit partial order if bins lack enough parts  
   - **Gripper Changes**: Automatic tool switch based on the required object (tray vs. part)

5. **Execution Flow**  
   - **Start Competition**: Triggered via `/ariac/start_competition`  
   - **Pick Tray** -> **Place on AGV** -> **Switch Gripper** -> **Pick Parts** -> **Quality Check** -> **Order Submission**

![Flowchart](https://raw.githubusercontent.com/vishnumandala/Agile-Robotics-for-Industrial-Automation-Competition-ARIAC-Project/main/results/architecture.png "Flowchart")

## Order Handling

1. **Order Reception**  
   - Orders are received on `/ariac/orders`. Each order includes:
     - Order ID  
     - Priority  
     - Kitting or assembly task details (parts, colors, tray ID, station)  

2. **Priority Queues**  
   - High-priority orders stored separately from normal orders  
   - A dedicated thread continuously checks for new high-priority orders

3. **Processing Flow**  
   - **Fetch Tray**: If tray not on AGV, switch to tray gripper and place tray on AGV  
   - **Switch Gripper**: Move to part gripper station if not already attached  
   - **Pick & Place Parts**: For each part in the order, retrieve from bin, place in tray quadrant  
   - **Quality Check**: Identify faulty or missing parts; discard and replace as needed  
   - **Submit Order**: Lock AGV and call `/ariac/submit_order`

4. **Partial Completion**  
   - If parts are insufficient, the system places whatever is available, then submits the incomplete order

## Perceiving the Environment

1. **Sensor Placement**  
   - Cameras above kitting stations (to identify trays, ARUCO markers)  
   - Cameras above bins (to locate parts, detect part types/colors)

2. **Part Detection**  
   - **Basic Logical Cameras** provide accurate poses  
   - **YOLOv8** classifies part type and color using RGB images  
   - Matches BLC poses with YOLO bounding boxes to confirm part identity

3. **Tray Detection**  
   - ARUCO markers on trays allow robust tray identification and orientation checks  
   - The system uses OpenCV for edge detection and template matching if needed

4. **Quality Control**  
   - `/ariac/perform_quality_check` ensures parts are correct in type, orientation, color, and not faulty

## Agility Challenges

1. **High-Priority Orders**  
   - The system suspends current orders when a high-priority order arrives  
   - After completing the urgent order, it resumes the previously paused order

2. **Insufficient Parts**  
   - If bins lack enough parts, partial orders are placed  
   - Submits the order with whatever is available

3. **Gripper Change**  
   - Automatic check if the correct gripper is attached (tray vs. part gripper)  
   - Switches grippers at the dedicated station if needed

4. **Faulty Parts**  
   - Parts failing quality checks are discarded in a disposal bin  
   - The system attempts to replace them from remaining bin stock

5. **Faulty Gripper**  
   - Dropped parts are detected by checking `/ariac/floor_robot_gripper_state`  
   - The robot retries picking a similar part if available

## Difficulties Faced

1. **Part Collisions with Tray**  
   - Mitigated by adjusting drop heights and locking trays immediately upon placement

2. **Real-Time Factor Variations**  
   - Implemented robust checks and parallel processing to handle slower/faster systems

3. **Path Planning with Attached Parts**  
   - Cleared waypoints and detached parts properly from the planning scene to avoid collisions

4. **Interfacing Python and C++**  
   - Created custom ROS2 services for seamless data exchange between high-level Python nodes and low-level C++ motion services

5. **Priority Switching Logic**  
   - Used a thread-based approach to pause/resume orders without causing thread locks

## Performance Metrics

- **Order Success Rate**: ~95% (includes partial submissions)  
- **Average Kitting Cycle**: ~40 seconds per part under nominal conditions  
- **High-Priority Handling**: Immediate interruption with minimal overhead  
- **Fault Recovery**: ~90% success for faulty part replacement, ~95% success for re-picks after gripper faults

## Conclusion

This ARIAC Kitting System showcases a **flexible and robust** approach to automated manufacturing tasks in a simulated environment. By integrating **ROS2** for distributed control, **MoveIt2** for motion planning, and **YOLOv8** + **ARUCO** for advanced perception, the system addresses real-world challenges of agility:

- **High-Priority Interruptions**  
- **Dynamic Tool Switching**  
- **Fault Tolerance**  
- **Partial Order Handling**

## Resources
- <a href="https://github.com/vishnumandala/Agile-Robotics-for-Industrial-Automation-Competition-ARIAC-Project/blob/main/results/Final_Report.pdf" class="md-link">Project Report</a>  
- <a href="https://pages.nist.gov/ARIAC_docs/en/latest/index.html" class="md-link">ARIAC Docs</a>  
- <a href="https://docs.ultralytics.com" class="md-link">YOLOv8</a>  
- <a href="https://docs.ros.org/en/galactic/index.html" class="md-link">ROS2 Galactic</a>  
- <a href="https://moveit.ros.org/documentation/tutorials/" class="md-link">MoveIt2</a>
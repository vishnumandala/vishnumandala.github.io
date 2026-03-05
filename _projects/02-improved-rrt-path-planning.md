---
name: Improved Bi-directional RRT* for Robot Path Planning
tools: [ROS, Turtlebot3, Gazebo, A*, APF, Dynamic Window, Sensor Fusion]
image: https://raw.githubusercontent.com/vishnumandala/Improved-Bi-directional-RRT-Algorithm-for-Robot-Path-Planning-/main/results/demo.gif
description: Enhanced Bi-Directional RRT* with Artificial Potential Field for efficient path planning in complex, dynamic environments.
---

<a href="{{ site.baseurl }}/projects/" class="back-button" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: inherit;">
    <i class="fas fa-arrow-left" style="margin-right: 5px;"></i> Back to Projects
</a>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0;"><strong>Improved Bi-directional RRT* for Robot Path Planning</strong></h1>
    <a href="https://github.com/vishnumandala/Improved-Bi-directional-RRT-Algorithm-for-Robot-Path-Planning-" 
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
   <span class="d-inline-block">April 10, 2023</span> &#8226; 
   <span class="tags">
      {% for tag in page.tools %}
      <span class="tag badge badge-pill text-primary border border-primary">{{ tag }}</span>
      {% endfor %}
    </span>
</p>

<div style="text-align: center; margin: 30px 0;">
    <img src="https://raw.githubusercontent.com/vishnumandala/Improved-Bi-directional-RRT-Algorithm-for-Robot-Path-Planning-/main/results/demo.gif" 
         alt="RRT* Path Planning Demo"
         style="width: 90%; max-width: 1200px; margin: auto;"
    />
</div>

## Project Overview

This project focused on enhancing the Rapidly-Exploring Random Tree (RRT) algorithm for mobile robot path planning by implementing an improved bi-directional variant in Python. The goal was to overcome standard RRT’s limitations – such as suboptimal and jagged paths – by integrating goal bias, heuristic guidance, and a post-processing path optimization step. The improved bi-directional approach grows two trees simultaneously (from the start and goal), connects them, and then smooths the resulting trajectory. This yields significantly shorter, smoother paths, enabling faster and more reliable real-time navigation in complex environments.

## Key Features

- **Bi-directional Tree Expansion:** Two trees grow simultaneously—one from the start and one from the goal. When they connect, a feasible path is obtained much faster than with a single tree.
- **Goal Biasing & Heuristics:** The algorithm increases the chance of sampling points near the goal, steering the tree expansion toward the target. Additional heuristics (such as an artificial potential field) help focus exploration in promising regions.
- **Path Optimization:** Once a path is found, a post-processing routine prunes unnecessary waypoints and smooths the path to eliminate excessive turns, resulting in a trajectory that is both efficient and easy for the robot to follow.
- **Dynamic Obstacle Handling:** By integrating a local planner (e.g., a Dynamic Window Approach) with the global RRT planner, the system can react to moving or unexpected obstacles by re-planning on the fly.
- **Python-based Implementation:** The entire algorithm is implemented in Python using libraries like NumPy and SciPy for computations and Matplotlib for visualizations. This makes the code both accessible for prototyping and easy to integrate into larger Python-based robotics frameworks.

## Development Process & Challenges

1. **Bidirectional Growth:** Implementing two trees required designing criteria for when and how to connect them. Fine-tuning the connection criteria was essential to balance speed and success rate.
2. **Incorporating Goal Bias:** We introduced a probability that the random sampler selects points near the goal. Tuning this probability was critical—too high and the algorithm becomes greedy, too low and it behaves like a standard RRT.
3. **Path Smoothing:** A post-processing step iterates through the found path, checking for direct connections between non-consecutive waypoints. If the direct path is collision-free, intermediate waypoints are removed, yielding a smooth trajectory.
4. **Dynamic Obstacle Avoidance:** Integrating the global planner with a local dynamic planner allowed the robot to adjust its path in real time when obstacles appeared. The challenge was ensuring seamless switching between global planning and local re-planning.
5. **Performance Optimization:** Python’s flexibility allowed us to vectorize many computations, ensuring the algorithm runs fast enough for real-time applications without compromising on path quality.

## Technologies Used

- **Programming Language:** Python
- **Libraries:** NumPy for numerical operations, SciPy for optimization routines, and Matplotlib for visualization.
- **Development Environment:** The algorithm was developed and tested in a Python environment (such as Jupyter Notebook and VS Code) which facilitates rapid prototyping and visualization.
- **Dynamic Simulation:** For validating the algorithm, a simulated environment was built to emulate robot navigation, allowing for real-time visualization of tree growth and path smoothing.

## Achievements & Metrics

- **Shorter, Smoother Paths:** On average, paths generated by our improved algorithm are 10–30% shorter and have fewer inflection points compared to standard RRT-based approaches.
- **Increased Efficiency:** The dual-tree approach dramatically reduces the number of samples required, cutting down the planning time—often by nearly 50% in open environments.
- **Robust Dynamic Re-planning:** When encountering dynamic obstacles, the integration with a local planner enables on-the-fly re-planning, maintaining a high success rate in real-world-like scenarios.
- **Demonstrated in Simulation:** Extensive simulation tests in Python validate that the improved algorithm consistently produces efficient trajectories even in cluttered environments.

## Algorithm Illustration

![Algorithm Illustration](https://raw.githubusercontent.com/vishnumandala/Improved-Bi-directional-RRT-Algorithm-for-Robot-Path-Planning-/main/Improved%20Bidirectional%20RRT%20Star.png "Algorithm Illustration")

### Goal Bias

```python
import numpy as np

# Sample point with goal bias
def sample_point(goal, X_max, Y_max, goal_bias=0.1):
    if np.random.rand() < goal_bias:
        return goal
    return np.array([np.random.uniform(0, X_max), np.random.uniform(0, Y_max)])
```

## Resources

- <a href="https://www.github.com/vishnumandala/Improved-Bi-directional-RRT-Algorithm-for-Robot-Path-Planning-/blob/main/proj5_hamza_vishnu.pdf" class="md-link">Project Report</a>

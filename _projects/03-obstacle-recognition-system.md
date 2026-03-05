---
name: Obstacle Recognition and Autonomous Navigation System
tools: [SLAM, YOLOv8, OpenCV, Raspberry Pi, Embedded Control]
image: https://raw.githubusercontent.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/main/results/demo.gif
description: Autonomous differential drive robot with real-time pick-and-place capabilities, achieving 92% detection accuracy using multi-sensor fusion.
---

<a href="{{ site.baseurl }}/projects/" class="back-button" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: inherit;">
    <i class="fas fa-arrow-left" style="margin-right: 5px;"></i> Back to Projects
</a>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0;"><strong>Obstacle Recognition and Autonomous Navigation System</strong></h1>
    <a href="https://github.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot" 
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
   <span class="d-inline-block">May 25, 2023</span> &#8226; 
   <span class="tags">
      {% for tag in page.tools %}
      <span class="tag badge badge-pill text-primary border border-primary">{{ tag }}</span>
      {% endfor %}
    </span>
</p>

<div style="text-align: center; margin: 30px 0;">
    <img src="https://raw.githubusercontent.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/main/results/demo.gif" 
         alt="Obstacle Recognition Demo"
         style="width: 90%; max-width: 1200px; margin: auto;"
    />
</div>

## Project Overview

This project develops a real-time obstacle detection and recognition system for a mobile robot using a customized YOLOv8 model. The system is designed to process live video feeds, detect obstacles (such as pedestrians, vehicles, or other objects), and classify them accurately. By leveraging the speed and accuracy of YOLOv8 in Python, the system enhances robot autonomy and safety, enabling the robot to avoid collisions and understand its surroundings effectively. This approach is especially useful in dynamic, real-world environments where quick and accurate object detection is critical.

## Key Features

- **Customized YOLOv8 Model:** The project adapts the latest YOLOv8 architecture for obstacle detection. The model is fine-tuned on a custom dataset specific to the robot's operational environment, ensuring high accuracy for the classes of interest.
- **Real-Time Detection:** Leveraging the efficiency of YOLOv8, the system processes video frames in real time (approximately 20 FPS), drawing bounding boxes and class labels over detected obstacles with minimal latency.
- **Obstacle Recognition & Classification:** Beyond mere detection, the system classifies obstacles into categories (e.g., person, chair, vehicle), enabling the robot to make informed decisions—such as slowing down for pedestrians while navigating around static objects.
- **Distance Estimation:** Although YOLOv8 does not directly provide depth, the system incorporates simple geometric calculations based on bounding box sizes and camera calibration data to approximate distances, enhancing the robot’s ability to plan avoidance maneuvers.
- **Python-based Implementation:** The entire pipeline is implemented in Python using OpenCV for image processing and PyTorch for running YOLOv8. This makes it easily integrable into existing Python-based robotics systems.
- **User-Friendly Integration:** The design focuses on simplicity and flexibility. The code is modular, enabling quick adaptation or extension of the detection system without the need for specialized hardware like Jetson or middleware like ROS.

## Development Process & Challenges

1. **Dataset Preparation:** A custom dataset was created by collecting images from the robot’s environment and manually annotating them using tools like LabelImg. Data augmentation (rotations, brightness adjustments) was employed to increase robustness.
2. **Model Customization:** We fine-tuned YOLOv8 on the custom dataset. A key challenge was ensuring the model learned to differentiate between similar objects (e.g., distinguishing a person from a similarly shaped inanimate object). Techniques such as careful annotation and balanced class weighting helped achieve high precision.
3. **Real-Time Performance:** Ensuring that the detection ran at around 20 FPS on standard hardware required code optimization. We streamlined image preprocessing using OpenCV and optimized the YOLOv8 inference pipeline with PyTorch to reduce latency.
4. **Integration of Distance Estimation:** Since YOLOv8 does not provide depth information, a simple geometric method was implemented to estimate object distance using known camera parameters and bounding box dimensions. This added a layer of intelligence for dynamic obstacle avoidance.
5. **Robustness Under Varied Conditions:** The model was tested under different lighting conditions and backgrounds. Initial tests showed false positives in shadowed areas; refining the training dataset and adjusting confidence thresholds mitigated these issues.

## Technologies Used

- **Programming Language:** Python
- **YOLOv8:** Utilized for state-of-the-art object detection and recognition.
- **OpenCV:** For image handling, preprocessing, and drawing bounding boxes.
- **PyTorch:** To run and fine-tune the YOLOv8 model.
- **Data Augmentation Tools:** To expand the custom dataset and improve model robustness.
- **Visualization Libraries:** Matplotlib and OpenCV for real-time visual feedback during development and testing.

## Achievements & Metrics

- **High Detection Accuracy:** The fine-tuned YOLOv8 model achieves around 92% mean Average Precision (mAP) on the test set, ensuring that most obstacles are detected and classified correctly.
- **Real-Time Processing:** The optimized pipeline runs at approximately 20 FPS, ensuring the robot can react promptly to dynamic obstacles.
- **Robust Classification:** The system consistently differentiates between critical classes (e.g., distinguishing a person from inanimate objects) even under varying lighting conditions.
- **Effective Distance Estimation:** The incorporated geometric approach provides reasonable distance approximations, enabling better obstacle avoidance planning.
- **Enhanced Navigation Safety:** In simulation and live tests, the robot successfully avoids collisions in scenarios where traditional sensor-based methods might fail, demonstrating the system’s practical benefits.

## Robot Model

![Robot Model](https://raw.githubusercontent.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/main/Bot.jpg "Robot Model")

## Confusion Matrix

![Confusion Matrix](https://raw.githubusercontent.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/main/Confusion%20matrix.jpg "Confusion Matrix")

## Performance Metrics

![Performance Metrics]( https://raw.githubusercontent.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/main/Results.jpg "Performance Metrics")

## Resources

- <a href="https://github.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/blob/main/annotated-Final_project_group31.pdf" class="md-link">Project Report</a>
- <a href="https://github.com/vishnumandala/Obstacle-Detection-and-Recognition-System-using-Customized-YOLO-Algorithm-for-a-Mobile-Robot/blob/main/Codes/Obstacle%20Detection.ipynb" class="md-link">Jupyter Notebook</a>
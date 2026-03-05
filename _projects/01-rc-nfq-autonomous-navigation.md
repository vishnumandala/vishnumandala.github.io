---
name: RC-NFQ Algorithm for Autonomous Navigation
tools: [PyTorch, Keras, CNN, DQN, Path Planning, Reinforcement Learning]
image: https://raw.githubusercontent.com/vishnumandala/Development-and-Evaluation-of-RC-NFQ-Algorithm-for-Autonomous-Navigation/main/results/demo.gif
description: Enhanced RC-NFQ (Regularized Convolutional Neural Fitted Q-Iteration) leveraging CNNs with dropout regularization for improved autonomous navigation.
---

<a href="{{ site.baseurl }}/projects/" class="back-button" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: inherit;">
    <i class="fas fa-arrow-left" style="margin-right: 5px;"></i> Back to Projects
</a>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0;"><strong>RC-NFQ Algorithm for Autonomous Navigation</strong></h1>
    <a href="https://github.com/vishnumandala/Development-and-Evaluation-of-RC-NFQ-Algorithm-for-Autonomous-Navigation"
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
   <span class="d-inline-block">April 15, 2024</span> &#8226; 
   <span class="tags">
      {% for tag in page.tools %}
      <span class="tag badge badge-pill text-primary border border-primary">{{ tag }}</span>
      {% endfor %}
    </span>
</p>

<div style="text-align: center; margin: 30px 0;">
    <img src="https://raw.githubusercontent.com/vishnumandala/Development-and-Evaluation-of-RC-NFQ-Algorithm-for-Autonomous-Navigation/main/results/demo.gif" 
         alt="RC-NFQ Algorithm Navigation Demo"
         style="width: 90%; max-width: 1200px; margin: auto;"
    />
</div>

## Project Overview

This project investigates an advanced autonomous navigation system for vehicles operating in densely trafficked environments. It centers on the **Regularized Convolutional Neural Fitted Q Iteration (RC-NFQ)** algorithm—a novel deep reinforcement learning approach that enhances traditional Neural Fitted Q Iteration (NFQ) by integrating convolutional neural networks (CNNs) and dropout regularization. The system is evaluated using the **HighwayEnv** simulation platform, which emulates realistic highway scenarios with varied traffic densities.

## What is RC-NFQ?

RC-NFQ is an extension of the NFQ framework that introduces several key innovations:

- **Convolutional Neural Networks (CNNs):**  
  RC-NFQ leverages CNNs to extract hierarchical features from high-dimensional sensory inputs (such as image-like data or emulated sensor data). This allows the algorithm to efficiently compress complex inputs into a form suitable for decision-making.

- **Dropout Regularization:**  
  Dropout layers are incorporated after convolutional and dense layers to mitigate overfitting. By randomly disabling a fraction of neurons during training, the model generalizes better to unseen data and complex environments.

- **Experience Replay & Batch Learning:**  
  An experience replay buffer stores state-action transitions, enabling the algorithm to perform stable mini-batch updates using the RMSprop optimizer. This batch approach ensures efficient use of collected data.

- **Target Network Updates:**  
  Similar to Deep Q-Networks (DQN), a separate target Q-network is maintained and updated periodically. This reduces the correlations between the Q-value estimates and the targets, improving stability during training.

The overall procedure is as follows:
- start procedure RC-NFQ(E, C, hyperparameters) 
- Initialize Q-network (with dropout regularization) and a target Q-network 
- Initialize experience replay buffer D for each episode: 
    - Collect transitions using an ε-greedy policy 
    - Store transitions in D for several training iterations: 
    - Sample a mini-batch from D 
- Compute training targets using the Bellman update 
- Update the Q-network via RMSprop 
- Periodically update the target network 
- return learned Q-function 
- end procedure


## Simulation Environment

The project uses **HighwayEnv**, a simulation platform designed for autonomous driving research. Key features include:

- **Realistic Traffic Scenarios:**  
  The environment simulates multi-lane highways, merging, roundabouts, intersections, and racetracks to mimic complex real-world conditions.

- **Customizability:**  
  Users can adjust traffic density, vehicle dynamics, and driving behaviors, allowing comprehensive evaluation of navigation strategies.

- **State Inputs:**  
  In the absence of raw image data, the simulation provides 2D state inputs (position and velocity vectors) for the ego vehicle and its neighbors, which emulate image-like information for the CNN.

  ![HighwayEnv](https://raw.githubusercontent.com/vishnumandala/Development-and-Evaluation-of-RC-NFQ-Algorithm-for-Autonomous-Navigation/main/highway-env.gif "HighwayEnv")

## Implementation Details

### Neural Network Architecture

The RC-NFQ Q-network is designed to process high-dimensional state inputs and produce Q-values for discrete driving actions. Its architecture comprises:

- **Input Layer:**  
  Accepts a structured vector representing positional and velocity data.

- **Convolutional Layers:**  
  - **Layer 1:** 16 filters with an 8×8 kernel, stride 4, using ReLU activation.  
  - **Layer 2:** 32 filters with a 4×4 kernel, stride 2, using ReLU activation.

- **Flattening & Dense Layers:**  
  The output from the convolutional layers is flattened and passed through two dense layers (256 neurons each), with dropout (25%) applied after each dense layer to improve generalization.

- **Output Layer:**  
  Produces action values corresponding to maneuvers like lane changes, acceleration, and deceleration.

### Training and Evaluation

- **Framework Transition:**  
  The algorithm was initially implemented in Keras and subsequently ported to PyTorch for greater flexibility and dynamic graph capabilities.

- **Optimizer and Hyperparameters:**  
  RMSprop is used as the optimizer with a learning rate tuned for non-stationary environments. Hyperparameters include:
  - **Discount Factor (γ):** 0.8
  - **Learning Rate (α_lr):** 0.01
  - **Episode Length (α_len):** ~20 steps (on average)
  - **Mini-batch Size:** 1000
  - **Training Iterations:** 2000 per training cycle
  - **Dropout Rate (α_drop):** 0.25

- **Exploration Strategy:**  
  An ε-greedy policy is employed, with epsilon decaying from 1.0 to 0.05 to balance exploration and exploitation over time.

## Performance Metrics

The evaluation of RC-NFQ focused on several key metrics, compared both over training and against a DQN baseline:

- **Episode Length:**  
  Indicates navigation stability; RC-NFQ achieved a smoothed average around 19.98 steps.

- **Total Reward:**  
  Cumulative rewards per episode (smoothed average near 19.74), reflecting effective reward accumulation through lane adherence, speed maintenance, and collision avoidance.

- **Exploration Epsilon:**  
  Gradually decays from 1.0 to 0.05, showing a well-balanced shift from exploration to exploitation.

- **Action Distribution:**  
  Analysis of action counts (lane changes, acceleration, deceleration) reveals a balanced exploration of different maneuvers.

- **Collision Rate (Crashes):**  
  Frequency of collisions decreases over time, though RC-NFQ initially exhibits more crashes than DQN, highlighting areas for improvement in situational awareness.

- **Discounted Rewards:**  
  A long-term planning metric, with a smoothed average around 12, indicating the quality of future reward estimation.

- **Average Episode Cost:**  
  Reflects penalties incurred from suboptimal actions and collisions, showing high variability that suggests further tuning is needed.

- **Average Velocity:**  
  Approximately 26 units, indicating efficient traversal of the environment while balancing safety.

A comparative analysis with a DQN model (using a multilayer perceptron with similar discount factors and learning rates) revealed that RC-NFQ:
- Slightly outperforms DQN in episode length and total reward.
- Shows a more balanced action utilization but struggles with collision avoidance.
- Demonstrates potential for enhanced performance with richer sensory inputs.

## Project Contributions and Future Directions

### Key Contributions:
- **Algorithm Adaptation:**  
  Successfully ported RC-NFQ from Keras to PyTorch and adapted it for the 2D state inputs provided by HighwayEnv.
- **Comprehensive Evaluation:**  
  Conducted extensive training and comparative analysis against DQN, highlighting both strengths and weaknesses of RC-NFQ.
- **Custom Tooling:**  
  Developed TensorBoard visualizations and logging tools to monitor training metrics, which informed hyperparameter tuning and model adjustments.

### Future Work:
- **Richer Sensory Inputs:**  
  Integrate raw image data or spatial grid representations to fully leverage the CNN architecture.
- **Enhanced Collision Avoidance:**  
  Refine the reward structure and experiment with advanced exploration techniques (e.g., softmax action selection, prioritized experience replay).
- **Architectural Enhancements:**  
  Explore deeper CNNs, LSTM layers, or hybrid architectures to capture temporal dependencies and improve decision-making.
- **Real-world Validation:**  
  Transition from simulation to field testing to evaluate performance under real traffic conditions.

## Conclusion

The RC-NFQ algorithm represents a promising step forward in autonomous vehicle navigation by addressing the challenges of high-dimensional sensory processing and dynamic decision-making. Although initial results show competitive performance with room for improvement—especially in collision avoidance—the integration of CNNs and dropout regularization offers a robust foundation for future advancements. Continued research incorporating richer inputs and enhanced model architectures will be crucial for achieving more reliable and safe autonomous navigation systems.

## Resources

- <a href="https://github.com/vishnumandala/Development-and-Evaluation-of-RC-NFQ-Algorithm-for-Autonomous-Navigation/blob/main/vishnum_rohitsai_final_report.pdf" class="md-link">Project Report</a>
- <a href="https://github.com/cosmoharrigan/rc-nfq" class="md-link">Base RC-NFQ Implementation</a>
- <a href="https://github.com/Farama-Foundation/HighwayEnv" class="md-link">HighwayEnv Simulation Platform</a>
- <a href="https://www.machineintelligence.org/papers/rc-nfq.pdf" class="md-link">RC-NFQ Original Paper</a>
- <a href="https://arxiv.org/abs/1312.5602" class="md-link">Deep Q-Networks (DQN) Paper</a>

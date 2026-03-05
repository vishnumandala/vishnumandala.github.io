---
name: MyDerma - Mobile Deep Learning for Skin Cancer Detection
tools: [TensorFlow Lite, ResNet-50, InceptionV3, DenseNet201, Flutter]
image: https://raw.githubusercontent.com/vishnumandala/MyDerma-Mobile-Deep-Learning-for-Real-Time-Skin-Cancer-Detection/main/results/demo.gif
description: Mobile application using ensemble deep learning models for real-time skin cancer detection with 97.15% accuracy.
---

<a href="{{ site.baseurl }}/projects/" class="back-button" style="display: inline-block; margin-bottom: 20px; text-decoration: none; color: inherit;">
    <i class="fas fa-arrow-left" style="margin-right: 5px;"></i> Back to Projects
</a>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0;"><strong>MyDerma - Mobile Deep Learning for Skin Cancer Detection</strong></h1>
    <a href="https://github.com/vishnumandala/MyDerma-Mobile-Deep-Learning-for-Real-Time-Skin-Cancer-Detection" 
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
   <span class="d-inline-block">December 15, 2023</span> &#8226; 
   <span class="tags">
      {% for tag in page.tools %}
      <span class="tag badge badge-pill text-primary border border-primary">{{ tag }}</span>
      {% endfor %}
    </span>
</p>

<div style="text-align: center; margin: 30px 0;">
    <img src="https://raw.githubusercontent.com/vishnumandala/MyDerma-Mobile-Deep-Learning-for-Real-Time-Skin-Cancer-Detection/main/results/demo.gif" 
         alt="MyDerma App Demo"
         style="width: 90%; max-width: 1200px; margin: auto;"
    />
</div>

## Project Overview
MyDerma is a mobile application designed to deliver early, accurate skin cancer detection through a hybrid deep learning approach. By leveraging an ensemble of state-of-the-art Convolutional Neural Networks (CNNs) – namely InceptionV3, DenseNet201, MobileNetV2, and ResNet50 – the system analyzes dermatoscopic images from the HAM10000 dataset. The project not only aims to achieve high classification accuracy (with ensemble test accuracy reaching **97.15%** and validation accuracy up to **98.46%**) but also to provide a non-invasive diagnostic tool accessible via mobile devices.

## Dataset Overview and Preprocessing
The system is built upon the HAM10000 dataset, a large collection of 10,000 dermatoscopic images representing seven different skin lesion types.

- **Image Dimensions:** 450 x 600 pixels in RGB.
- **Data Diversity:** Images cover various skin lesion types such as melanoma, basal cell carcinoma, and benign keratosis.
- **Preprocessing:**  
  - **Resizing:** Images are resized to model-specific dimensions (e.g., 256x192 for InceptionV3 and DenseNet201, 224x224 for MobileNetV2 and ResNet50, and 64x64 for a custom CNN).  
  - **Augmentation:** Techniques such as rotation, zooming, shifting, shearing, horizontal flipping, and brightness adjustments are applied to combat class imbalance and enhance model generalization.
- **Normalization:** Images are normalized (zero mean, unit variance) to optimize training.

## Model Architecture and Ensemble Approach
To tackle the challenges in skin lesion classification, the project fine-tunes several pre-trained deep learning models:

- **InceptionV3:** Utilized for its efficient computation and multi-scale feature extraction.
- **DenseNet201:** Chosen for its densely connected layers, which improve feature propagation.
- **MobileNetV2:** Optimized for mobile deployment, balancing performance with computational efficiency.
- **ResNet50:** Leveraging residual learning for deeper network training.

These models are integrated into an **ensemble architecture**:
- **Feature Extraction:** Each model processes the input image, and global average pooling is applied to obtain feature vectors.
- **Concatenation:** The pooled features are concatenated to form a comprehensive representation.
- **Classification:** A dense layer (512 units with ReLU activation) followed by dropout (rate=0.5) and a final softmax layer (7 units) outputs the probabilities across the lesion classes.

## Experimental Results
A series of experiments were conducted to evaluate the performance of each model and the ensemble approach. Key performance highlights include:

- **Individual Model Results:**  
  - *Fine-tuned DenseNet201:* Test accuracy of 84.93% (up to 93.72% when retrained)  
  - *Retrained ResNet50:* Achieved a test accuracy of 96.84%
- **Ensemble Performance:**  
  - **Test Accuracy:** 97.15%  
  - **Validation Accuracy:** 98.46%  
  - **F1-Scores:** Up to 0.99 for critical classes (e.g., melanoma)

The experiments also included ablation studies and hyperparameter tuning (learning rate adjustments, dropout, and data augmentation) to optimize model performance while addressing issues like overfitting and class imbalance (using SMOTE).

## Mobile Application: MyDerma
The **MyDerma** mobile application integrates the ensemble model into an end-to-end diagnostic tool:

- **Front-end:**  
  - Developed using Android Studio (2023 Hedgehog) and Flutter (3.19.0) to create an intuitive user interface.
  - Facilitates image selection, pre-processing (resizing and normalization), and seamless user interaction.
  
- **Back-end:**  
  - Powered by TensorFlow Lite, enabling efficient on-device inference without reliance on cloud processing.
  - Converts model outputs into user-friendly diagnostic predictions, ensuring real-time feedback (typically under 2 seconds per image).

## Limitations
Despite impressive performance, the study identifies several limitations:
- **Data Quality and Diversity:** Reliance on the HAM10000 dataset may not capture all variations of skin lesions.
- **Mobile Deployment Challenges:** Variability in image quality from mobile cameras and environmental conditions can affect accuracy.
- **Computational Constraints:** Limited training epochs (20–25) due to resource constraints may impact model convergence.
- **SMOTE Overhead:** While mitigating class imbalance, SMOTE increased the dataset size significantly, affecting training duration.

## Conclusion & Future Work
The project successfully demonstrates a robust mobile solution for skin cancer detection by leveraging a hybrid ensemble of deep learning models. The high diagnostic accuracies achieved indicate the transformative potential of this approach in dermatological screening. Future directions include:
- **Enhanced Generalization:** Expanding datasets to include a broader spectrum of skin lesions.
- **Integration of Patient Data:** Incorporating demographic and clinical data for personalized diagnostics.
- **User Interface Enhancements:** Refining the mobile application for improved usability.
- **Clinical Trials:** Conducting real-world trials to further validate the system's efficacy.

## Resources
- <a href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T" class="md-link">Dataset</a>
- <a href="https://github.com/vishnumandala/MyDerma-Mobile-Deep-Learning-for-Real-Time-Skin-Cancer-Detection/blob/main/809K_Finalproject_report.pdf" class="md-link">Project Report</a>
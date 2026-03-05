---
layout: default
title: Home
permalink: /
---

{% include landing.html %}

<section class="proof-strip reveal">
  <div class="proof-grid">
    {% for item in site.data.highlights %}
      <article class="proof-card">
        <i class="{{ item.icon }}" aria-hidden="true"></i>
        <p class="proof-value">{{ item.value }}</p>
        <p class="proof-label">{{ item.label }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section id="about" class="about-preview reveal">
  {% include about.html %}
</section>

{% include fprojects.html %}

<section class="home-cta reveal">
  <h2>Open to impactful robotics roles and collaborations.</h2>
  <p>If you are building autonomous systems, I would love to connect.</p>
  <a class="btn btn-primary" href="mailto:{{ site.author.email }}">Start a conversation</a>
</section>

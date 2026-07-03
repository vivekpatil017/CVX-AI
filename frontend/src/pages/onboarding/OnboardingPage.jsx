import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  UserCircle,
  FileText,
  Sparkles,
  Download,
  Zap,
  Shield,
  Clock,
  Palette,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { useRef } from 'react';
import './OnboardingPage.css';

/* ===== 3D Floating Shapes ===== */
const Cube3D = () => (
  <div className="shape-cube">
    <div className="face face-front" />
    <div className="face face-back" />
    <div className="face face-right" />
    <div className="face face-left" />
    <div className="face face-top" />
    <div className="face face-bottom" />
  </div>
);

const FloatingShapes = () => (
  <div className="floating-shapes">
    <div className="shape shape-1"><Cube3D /></div>
    <div className="shape shape-2"><div className="shape-ring" /></div>
    <div className="shape shape-3"><div className="shape-diamond" /></div>
    <div className="shape shape-4"><Cube3D /></div>
    <div className="shape shape-5"><div className="shape-orb" /></div>
    <div className="shape shape-6"><div className="shape-ring" style={{ width: 40, height: 40 }} /></div>
    <div className="shape shape-7"><div className="shape-diamond" /></div>
    <div className="shape shape-8"><div className="shape-orb" style={{ width: 14, height: 14 }} /></div>
    <div className="shape shape-9"><Cube3D /></div>
    <div className="shape shape-10"><div className="shape-ring" style={{ width: 35, height: 35 }} /></div>
  </div>
);

/* ===== 3D Resume Preview Card ===== */
const Resume3DPreview = () => (
  <div className="resume-3d-container">
    <motion.div
      className="resume-3d-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="resume-3d-header" />
      <div className="resume-3d-line" />
      <div className="resume-3d-line" />
      <div className="resume-3d-line" />
      <div className="resume-3d-line" />
      <div className="resume-3d-section" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-section" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-line-sm" />
      <div className="resume-3d-line-sm" />
    </motion.div>
  </div>
);

/* ===== Interactive 3D Step Card ===== */
const StepCard = ({ step, index, totalSteps }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <motion.div
      className="step-card-wrapper"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        className="step-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="step-number">0{index + 1}</span>
        <div className={`step-icon-wrapper step-icon-${index + 1}`}>
          <step.icon size={28} color={step.iconColor} />
        </div>
        <h3 className="step-title">{step.title}</h3>
        <p className="step-description">{step.description}</p>
        {index < totalSteps - 1 && <div className="step-connector" />}
      </div>
    </motion.div>
  );
};

/* ===== Feature Card ===== */
const FeatureCard = ({ feature, index }) => (
  <motion.div
    className="feature-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
  >
    <div className="feature-icon" style={{ background: feature.bg }}>
      <feature.icon size={22} color={feature.color} />
    </div>
    <div>
      <h4 className="feature-title">{feature.title}</h4>
      <p className="feature-desc">{feature.desc}</p>
    </div>
  </motion.div>
);

/* ===== Main Onboarding Page ===== */
const OnboardingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const steps = [
    {
      icon: UserCircle,
      iconColor: '#34d399',
      title: 'Create Your Profile',
      description:
        'Add your professional details — experience, skills, education, and more. Build once and reuse across unlimited resumes.',
    },
    {
      icon: FileText,
      iconColor: '#818cf8',
      title: 'Generate with AI',
      description:
        'Paste a job description and let AI craft a perfectly tailored resume or cover letter optimized for ATS systems.',
    },
    {
      icon: Download,
      iconColor: '#a78bfa',
      title: 'Download & Apply',
      description:
        'Download your polished resume as a professional PDF. Track your applications and iterate on your content.',
    },
  ];

  const features = [
    {
      icon: Zap,
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.1)',
      title: 'Lightning Fast',
      desc: 'Generate professional resumes in under 30 seconds with our AI engine.',
    },
    {
      icon: Shield,
      color: '#34d399',
      bg: 'rgba(16, 185, 129, 0.1)',
      title: 'ATS Optimized',
      desc: 'Every resume is designed to pass Applicant Tracking Systems with flying colors.',
    },
    {
      icon: Clock,
      color: '#818cf8',
      bg: 'rgba(99, 102, 241, 0.1)',
      title: 'Version History',
      desc: 'Keep track of all your generated resumes and cover letters in one place.',
    },
    {
      icon: Palette,
      color: '#f472b6',
      bg: 'rgba(244, 114, 182, 0.1)',
      title: 'Beautiful Templates',
      desc: 'Professional, clean designs that make your application stand out from the crowd.',
    },
  ];

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-page" ref={containerRef}>
      {/* Animated background */}
      <div className="onboarding-bg" />

      {/* 3D Floating shapes */}
      <FloatingShapes />

      {/* ===== HERO SECTION ===== */}
      <motion.section
        className="onboarding-section hero-section"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-Powered Resume Builder
          </div>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <span className="hero-title-line">Welcome to</span>
          <span className="hero-title-line hero-title-gradient">ResumeAI</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Build stunning, ATS-optimized resumes and cover letters in seconds.
          Let AI do the heavy lifting while you land your dream job.
        </motion.p>

        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
        >
          <button className="btn-primary-glow" onClick={handleGetStarted}>
            <Sparkles size={18} />
            Get Started — It&apos;s Free
            <ArrowRight size={18} />
          </button>
          <a href="#how-it-works" className="btn-secondary-glass">
            See How It Works
            <ChevronDown size={18} />
          </a>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="scroll-indicator" />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="onboarding-section steps-section" id="how-it-works">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">
            Three Steps to Your <span className="hero-title-gradient">Perfect Resume</span>
          </h2>
          <p className="section-subtitle">
            Our streamlined process makes it effortless to create professional
            documents that get you hired.
          </p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} totalSteps={steps.length} />
          ))}
        </div>

        <Resume3DPreview />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="onboarding-section features-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Why ResumeAI</span>
          <h2 className="section-title">
            Everything You Need to <span className="hero-title-gradient">Stand Out</span>
          </h2>
          <p className="section-subtitle">
            Packed with powerful features designed to give you the competitive edge.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="onboarding-section cta-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h2 className="cta-title">
            Ready to Build Your <span className="hero-title-gradient">Dream Resume?</span>
          </h2>
          <p className="cta-subtitle">
            Join thousands of job seekers who have transformed their career with ResumeAI.
          </p>
        </motion.div>

        <motion.div
          className="cta-glow-ring"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="btn-primary-glow" onClick={handleGetStarted}>
            <Sparkles size={20} />
            Get Started Now
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default OnboardingPage;

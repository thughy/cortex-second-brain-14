import { useState } from 'react';
import { Plus, Puzzle, BrainCircuit, Brain, Sparkles, Paperclip, Monitor, Search, Lock, ScanSearch, Share, Sun } from 'lucide-react';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { FeatureIllustration } from './FeatureIllustration';

interface ManageSectionProps {
  show: boolean;
}

export const ManageSection = ({
  show
}: ManageSectionProps) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  const features = [{
    icon: <Plus size={32} className="text-primary" />,
    title: "Add Cells",
    description: "Seamlessly import data (CSV, HTML, AI scraping, or clipping) or create new entries effortlessly."
  }, {
    icon: <Puzzle size={32} className="text-primary" />,
    title: "Plug & Play",
    description: "Fully customizable with an open-source framework that adapts to your workflow."
  }, {
    icon: <BrainCircuit size={32} className="text-primary" />,
    title: "Spatial Thinking",
    description: "Visualize ideas with brain cells, lists, galleries, tables, maps, or timelines."
  }, {
    icon: <Brain size={32} className="text-primary" />,
    title: "Contextual",
    description: "Say goodbye to folders—create sub-brains tailored to specific projects or tasks."
  }, {
    icon: <Sparkles size={32} className="text-primary" />,
    title: "Intelligence",
    description: "AI-powered insights that extract what they mention from every pinned topic."
  }, {
    icon: <Paperclip size={32} className="text-primary" />,
    title: "Clip",
    description: "Collect data from any source or device directly into your second brain."
  }, {
    icon: <Monitor size={32} className="text-primary" />,
    title: "Agnostic",
    description: "Clip any type of content with built-in extraction tools."
  }, {
    icon: <Search size={32} className="text-primary" />,
    title: "Search",
    description: "Find what you're looking for with intelligent, precision-focused search capabilities."
  }, {
    icon: <Lock size={32} className="text-primary" />,
    title: "Private",
    description: "Keep all your work secure in a private, controlled space."
  }, {
    icon: <ScanSearch size={32} className="text-primary" />,
    title: "Recognition",
    description: "Identify and extract text from images, videos, and more."
  }, {
    icon: <Share size={32} className="text-primary" />,
    title: "Share",
    description: "Share thoughts and ideas to collaborate seamlessly."
  }, {
    icon: <Sun size={32} className="text-primary" />,
    title: "D/L mode",
    description: "Toggle between dark and simplified interface with custom color modes for focus."
  }];

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index === activeFeature ? null : index);
  };

  return <AnimatedTransition show={show} animation="slide-up" duration={600}>
      <div className="py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <h2 className="text-4xl font-bold text-primary md:text-8xl">Manage</h2>
          <p className="text-foreground max-w-3xl text-xl md:text-2xl mt-2">The first and only extension for your real mind.</p>
        </div>

        <FeatureIllustration 
          featureIndex={activeFeature} 
          className="transition-all duration-500"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center transition-all duration-300 ${activeFeature === index ? 'scale-105' : 'hover:scale-102'} cursor-pointer`}
              onClick={() => handleFeatureClick(index)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${activeFeature === index ? 'bg-primary/20 ring-2 ring-primary/50' : 'bg-primary/10'}`}>
                {feature.icon}
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedTransition>;
};

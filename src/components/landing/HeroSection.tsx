
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedTransition } from '@/components/AnimatedTransition';

interface HeroSectionProps {
  showTitle: boolean;
}

export const HeroSection = ({ showTitle }: HeroSectionProps) => {
  return (
    <div className="py-20 md:py-28 flex flex-col items-center text-center">
      <AnimatedTransition show={showTitle} animation="slide-up" duration={600}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground bg-clip-text">
          Your Personal AI Engine
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Revolutionize the way you think, create, and manage.
        </p>
        
        <Button 
          size="lg" 
          className="rounded-full px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-300"
        >
          Join Waitlist
        </Button>
      </AnimatedTransition>
    </div>
  );
};


import { Button } from '@/components/ui/button';
import { AnimatedTransition } from '@/components/AnimatedTransition';

interface DesignSectionProps {
  show: boolean;
}

export const DesignSection = ({ show }: DesignSectionProps) => {
  const templateCategories = [
    {
      title: "Creative Projects",
      templates: ["Course", "Book", "Presentation", "Brainstorming"]
    },
    {
      title: "Business Tools",
      templates: ["Marketing", "Proposal", "Contract", "Product Launch"]
    },
    {
      title: "Research & Strategy",
      templates: ["Research", "Problem Solving", "Content", "Social Media"]
    }
  ];

  return (
    <AnimatedTransition show={show} animation="slide-up" duration={600}>
      <div className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">Design</h2>
          <p className="text-xl text-foreground max-w-md">
            Choose from over 200 ready-to-use templates tailored to your needs.
          </p>
        </div>

        <div className="space-y-10">
          {templateCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-bold">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.templates.map((template, idx) => (
                  <div 
                    key={idx} 
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center">
          <p className="text-lg text-muted-foreground mb-4 sm:mb-0 sm:mr-8">
            Accelerate your workflow and creativity
          </p>
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-300"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

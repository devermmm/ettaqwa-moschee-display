interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-2 bg-background/50 backdrop-blur-sm z-50">
      <div 
        className="h-full bg-gradient-to-r from-primary via-accent to-primary-glow transition-all duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

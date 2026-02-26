
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = ({ onStartAssessment }: { onStartAssessment: () => void }) => {
    return (
        <div className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Glows */}
            <div className="hero-glow top-[-10%] left-[-10%]" />
            <div className="hero-glow bottom-[-10%] right-[-10%] opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Vitamin Analysis</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight"
                    >
                        Your Health, <br />
                        <span className="text-gradient">Intelligently Balanced.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Experience the future of personal nutrition. Our advanced AI detects nutrient deficiencies
                        with clinical precision, providing personalized roadmaps to peak vitality.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4 pt-4"
                    >
                        <Button
                            size="lg"
                            onClick={onStartAssessment}
                            className="rounded-2xl h-14 px-8 bg-violet-600 hover:bg-violet-700 text-lg font-semibold shadow-xl shadow-violet-500/20 button-glow"
                        >
                            Start AI Assessment
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-2xl h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-lg font-semibold backdrop-blur-sm"
                            onClick={() => {
                                const chatEl = document.getElementById("active-tabs-section");
                                if (chatEl) chatEl.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState({}, '', '/nutritionist');
                                window.dispatchEvent(new PopStateEvent('popstate'));
                            }}
                        >
                            Talk to AI Nutritionist
                        </Button>
                    </motion.div>

                    {/* Social Proof / Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-white/5 mt-20"
                    >
                        {[
                            { label: "Precision Detection", icon: Shield, value: "99.8%" },
                            { label: "Real-time Analysis", icon: Zap, value: "< 2s" },
                            { label: "AI Experts", icon: Sparkles, value: "24/7" },
                            { label: "Health Score", icon: Zap, value: "Adaptive" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center justify-center gap-2 text-violet-400 mb-2">
                                    <stat.icon className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Abstract Shapes */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animation-delay-2000" />
        </div>
    );
};

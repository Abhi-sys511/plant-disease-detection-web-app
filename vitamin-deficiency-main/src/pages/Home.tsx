
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Pill, Shield, Zap, Sparkles, Star, CheckCircle2, Award, HeartPulse, Activity } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-950 text-white selection:bg-violet-500/30">
      <div className="bg-grid fixed inset-0 z-0 opacity-20" />

      <Navbar />

      <main className="relative z-10">
        <Hero onStartAssessment={() => navigate("/dashboard")} />

        {/* Value Proposition */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Detection",
                  desc: "Our neural networks analyze 50+ physiological markers to pinpoint specific nutrient gaps.",
                  icon: Shield,
                },
                {
                  title: "Instant Insights",
                  desc: "Get laboratory-grade nutritional analysis in real-time without the wait.",
                  icon: Zap,
                },
                {
                  title: "Expert Guidance",
                  desc: "24/7 access to your personalized AI Nutritionist for supplement and diet optimization.",
                  icon: HeartPulse,
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism rounded-3xl p-8 hover:bg-white/5 transition-all group border-white/5"
                >
                  <div className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white/5 backdrop-blur-3xl relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Three Steps to Vitality</h2>
              <p className="text-slate-400 text-lg">Our streamlined process ensures you get the most accurate health profile possible.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -translate-y-12" />

              {[
                { step: "01", title: "Assessment", desc: "Share your symptoms, diet, and lifestyle through our interactive AI interface.", icon: Activity },
                { step: "02", title: "AI Analysis", desc: "Our engine correlates your data with clinical nutrition databases instantly.", icon: Sparkles },
                { step: "03", title: "Optimization", desc: "Receive a personalized roadmap including food, supplements, and AI chat support.", icon: CheckCircle2 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-3xl glass-morphism border-violet-500/30 flex items-center justify-center text-2xl font-black text-violet-400 shadow-2xl">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-slate-400 max-w-xs mx-auto">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="glass-morphism rounded-[3rem] p-12 md:p-20 relative overflow-hidden border-white/5">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Award className="w-32 h-32" />
              </div>

              <div className="max-w-2xl space-y-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-violet-400 fill-violet-400 w-5 h-5" />)}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  "Vitamin AI found exactly why I was feeling fatigued. Within weeks of following their plan, my energy is back to 100%."
                </h2>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-16 h-16 rounded-full premium-gradient" />
                  <div>
                    <div className="font-bold text-xl">Dr. Marcus Thorne</div>
                    <div className="text-slate-500">Clinical Research Specialist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 pb-32">
          <div className="container mx-auto px-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-morphism rounded-[3rem] p-12 md:p-24 text-center space-y-8 premium-gradient relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-navy-950/10 transition-colors" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Ready to optimize?</h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">Join 50,000+ health-conscious individuals taking control of their vitality today.</p>
                <div className="pt-8">
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="h-16 px-12 rounded-2xl bg-white text-navy-950 hover:bg-slate-100 text-xl font-bold shadow-2xl transition-all hover:scale-105"
                  >
                    Get Started Now
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-navy-950/80 backdrop-blur-xl py-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center">
                  <Pill className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tighter">Vitamin AI</span>
              </div>
              <p className="text-slate-500 leading-relaxed">Defining the next generation of personal health and nutritional intelligence.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-20">
              <div className="space-y-6">
                <h4 className="font-bold uppercase tracking-widest text-xs text-white">Platform</h4>
                <ul className="space-y-4 text-slate-500 text-sm">
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Assessments</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">AI Nutritionist</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold uppercase tracking-widest text-xs text-white">Company</h4>
                <ul className="space-y-4 text-slate-500 text-sm">
                  <li><a href="#" className="hover:text-violet-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-widest">
            <p>© 2026 Vitamin AI. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

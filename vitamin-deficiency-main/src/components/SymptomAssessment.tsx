
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Thermometer, Zap, Utensils, Cigarette, Moon, Activity, Sun, Droplets, Brain, Beaker, Wine, ShieldAlert, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const symptomsList = [
    { id: "fatigue", label: "Chronic Fatigue", icon: Activity },
    { id: "paleSkin", label: "Pale Skin", icon: Thermometer },
    { id: "jaundice", label: "Jaundice (Yellowing)", icon: Sun },
    { id: "diarrhea", label: "Chronic Diarrhea", icon: Droplets },
    { id: "soreThroat", label: "Frequent Sore Throat", icon: HeartPulse },
    { id: "tingling", label: "Numbness/Tingling", icon: Zap },
    { id: "memoryIssues", label: "Brain Fog / Memory", icon: Brain },
    { id: "sleep", label: "Lack of Sleep", icon: Moon },
    { id: "breathlessness", label: "Shortness of Breath", icon: Thermometer },
    { id: "hairLoss", label: "Hair Thinning", icon: Thermometer },
    { id: "bonePain", label: "Joint/Bone Pain", icon: Thermometer },
    { id: "musclePain", label: "Muscle Weakness", icon: Zap },
    { id: "bruising", label: "Easy Bruising", icon: Thermometer },
    { id: "dizziness", label: "Dizziness", icon: Zap },
];

const dietTypes = [
    { id: "mixed", label: "Standard / Mixed", description: "All food groups included" },
    { id: "vegetarian", label: "Vegetarian", description: "No meat, includes dairy/eggs" },
    { id: "vegan", label: "Plant-Based / Vegan", description: "No animal products" },
    { id: "keto", label: "Low Carb / Keto", description: "High fat, minimal carbs" },
];

const lifestyleFactors = [
    { id: "smoking", label: "Smoking", icon: Cigarette },
    { id: "heavy_exercise", label: "Intense Exercise", icon: Activity },
    { id: "low_sun", label: "Low Sun Exposure", icon: Sun },
    { id: "alcohol", label: "Alcoholic / Frequent Drinker", icon: Wine },
    { id: "stress", label: "High Stress Levels", icon: ShieldAlert },
    { id: "sedentary", label: "Sedentary Lifestyle", icon: Activity },
];

export const SymptomAssessment = ({ onComplete }: { onComplete: (data: any) => void }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        symptoms: {} as Record<string, boolean>,
        diet: "mixed",
        lifestyle: {} as Record<string, boolean>,
    });

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const toggleSymptom = (id: string) => {
        setData((prev) => ({
            ...prev,
            symptoms: { ...prev.symptoms, [id]: !prev.symptoms[id] },
        }));
    };

    const toggleLifestyle = (id: string) => {
        setData((prev) => ({
            ...prev,
            lifestyle: { ...prev.lifestyle, [id]: !prev.lifestyle[id] },
        }));
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
        else onComplete(data);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="glass-morphism rounded-3xl p-8 md:p-12 border-white/5 relative overflow-hidden">
                {/* Progress */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Step {step} of {totalSteps}</span>
                        <span className="text-xs font-bold text-slate-500">{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/5" indicatorClassName="bg-violet-500" />
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-white">Select your symptoms</h2>
                                <p className="text-slate-400">Choose everything that applies to your current state.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {symptomsList.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => toggleSymptom(s.id)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${data.symptoms[s.id]
                                            ? "bg-violet-500/10 border-violet-500 shadow-lg shadow-violet-500/10"
                                            : "bg-white/5 border-transparent hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${data.symptoms[s.id] ? "bg-violet-500 text-white" : "bg-white/10 text-slate-400"}`}>
                                            <s.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`font-medium ${data.symptoms[s.id] ? "text-white" : "text-slate-300"}`}>{s.label}</span>
                                        {data.symptoms[s.id] && <Check className="ml-auto w-5 h-5 text-violet-400" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-white">Dietary Habits</h2>
                                <p className="text-slate-400">Your diet significantly impacts your nutrient baseline.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {dietTypes.map((d) => (
                                    <button
                                        key={d.id}
                                        onClick={() => setData({ ...data, diet: d.id })}
                                        className={`flex flex-col gap-1 text-left p-6 rounded-2xl border-2 transition-all duration-300 ${data.diet === d.id
                                            ? "bg-violet-500/10 border-violet-500"
                                            : "bg-white/5 border-transparent hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`text-lg font-bold ${data.diet === d.id ? "text-white" : "text-slate-300"}`}>{d.label}</span>
                                            {data.diet === d.id && <div className="w-4 h-4 rounded-full bg-violet-500" />}
                                        </div>
                                        <p className="text-sm text-slate-500">{d.description}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-white">Lifestyle Factors</h2>
                                <p className="text-slate-400">Select environmental and habit-based factors.</p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {lifestyleFactors.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => toggleLifestyle(l.id)}
                                        className={`flex flex-col items-center justify-center gap-4 aspect-square rounded-3xl border-2 transition-all duration-300 ${data.lifestyle[l.id]
                                            ? "bg-violet-500/10 border-violet-500"
                                            : "bg-white/5 border-transparent hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${data.lifestyle[l.id] ? "bg-violet-500 text-white" : "bg-white/10 text-slate-400"}`}>
                                            <l.icon className="w-7 h-7" />
                                        </div>
                                        <span className={`font-bold ${data.lifestyle[l.id] ? "text-white" : "text-slate-400"}`}>{l.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
                    {step > 1 && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={prevStep}
                            className="rounded-2xl h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        >
                            <ArrowLeft className="mr-2 w-5 h-5" />
                            Back
                        </Button>
                    )}
                    <Button
                        size="lg"
                        onClick={nextStep}
                        className={`rounded-2xl h-14 px-8 bg-violet-600 hover:bg-violet-700 font-bold ml-auto min-w-[160px] shadow-lg shadow-violet-500/20`}
                    >
                        {step === totalSteps ? "Generate Report" : "Continue"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};


import { motion } from "framer-motion";
import { Check, Zap, Crown, Shield, Rocket, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Foundation",
        price: "Free",
        description: "Core biomarker analysis for individuals.",
        features: ["Basic Vitamin Analysis", "3 Assessments / Month", "General AI Nutritionist", "Community Support"],
        icon: Rocket,
        gradient: "from-slate-500 to-slate-700",
        current: false
    },
    {
        name: "Platinum",
        price: "$29.00",
        description: "Advanced intelligence perception for peak vitality.",
        features: ["Neural Pulse Analysis", "Unlimited Assessments", "Contextual AI Memory", "Radar Health Charts", "Expert Medical Reasoning", "Priority Data Processing"],
        icon: Crown,
        gradient: "from-violet-500 to-fuchsia-500",
        current: true
    },
    {
        name: "Ecosystem Pro",
        price: "$79.00",
        description: "Full family and genetic biomarker ecosystem.",
        features: ["Genetic Risk Mapping", "Family Dashboard", "24/7 Medical Hotline", "Hormonal Balance Tracking", "White-glove Concierge"],
        icon: Zap,
        gradient: "from-blue-500 to-emerald-500",
        current: false
    }
];

export const Subscription = () => {
    return (
        <div className="space-y-12 pb-20">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight">Ecosystem Membership</h1>
                <p className="text-slate-500">Scale your intelligence perception with premium biomarker depth and advanced medical reasoning.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.name} className={cn(
                        "glass-layer-1 border-white/5 relative overflow-hidden flex flex-col pt-8 card-lift",
                        plan.current && "border-violet-500/50 shadow-2xl shadow-violet-500/10 bg-violet-600/5"
                    )}>
                        {plan.current && (
                            <div className="absolute top-0 right-0 py-1 px-4 bg-violet-600 text-[10px] font-bold uppercase tracking-widest text-white rounded-bl-xl">
                                Current Plan
                            </div>
                        )}
                        <CardHeader className="text-center space-y-4">
                            <div className={cn("w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br shadow-xl", plan.gradient)}>
                                <plan.icon className="text-white w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription className="text-slate-400 mt-2">{plan.description}</CardDescription>
                            </div>
                            <div className="pt-4">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                {plan.price !== "Free" && <span className="text-slate-500 text-sm ml-1">/ month</span>}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4 pt-6">
                            {plan.features.map((feature) => (
                                <div key={feature} className="flex items-start gap-3 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0">
                                        <Check className="text-emerald-400 w-3 h-3" />
                                    </div>
                                    <span className="text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="pt-8 pb-8">
                            <Button className={cn(
                                "w-full h-12 rounded-xl font-bold transition-all",
                                plan.current ? "bg-white/5 border border-white/10 text-slate-400 cursor-default" : "bg-white text-black hover:bg-slate-200"
                            )}>
                                {plan.current ? "Current Plan" : "Upgrade Now"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Payment Info */}
            <Card className="glass-layer-2 border-white/5 max-w-3xl mx-auto overflow-hidden">
                <CardContent className="p-8 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center relative shadow-xl overflow-hidden">
                            <CreditCard className="text-slate-900 w-8 h-8" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Default Payment Method</p>
                            <p className="text-xs text-slate-500">Visa ending in •••• 9821 • Expires 08/28</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">Edit Method</Button>
                </CardContent>
            </Card>
        </div>
    );
};


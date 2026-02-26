
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { SymptomAssessment } from "@/components/SymptomAssessment";
import { AIResults } from "@/components/AIResults";
import { VitaminChat } from "@/components/VitaminChat";
import { IntelligencePerception } from "@/components/IntelligencePerception";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SmartAlerts } from "@/components/SmartAlerts";
import { FutureRiskChart } from "@/components/FutureRiskChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, LayoutDashboard, Sparkles, ClipboardCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiomarkerLog } from "@/components/BiomarkerLog";
import { HealthReportModal } from "@/components/HealthReportModal";

const vitaminDeficiencies = {
  "vitamin_b12": {
    name: "Vitamin B12",
    probability: 0.92,
    confidence: 94,
    reasoning: [
      "Symptom correlation: Neurological tingling matches peripheral neuropathy patterns.",
      "Dietary analysis: Vegan/Vegetarian profile increases risk factor by 65%.",
      "Fatigue pattern: Matches megaloblastic anemia clinical indicators.",
      "Absorption factor: Age and gender profile suggests intrinsic factor optimization."
    ],
    description: "Your symptoms strongly indicate a Vitamin B12 deficiency, common with your profile. B12 is crucial for nerve function and energy metabolism.",
    sources: ["Methylcobalamin Supplement", "Wild-caught Fish", "Fortified Nutritional Yeast"]
  },
  "vitamin_d": {
    name: "Vitamin D3",
    probability: 0.85,
    confidence: 88,
    reasoning: [
      "Lifestyle: Low sun exposure identified in region/activity logs.",
      "Muscle profile: Bone pain and fatigue match D3 deficiency indicators.",
      "Seasonal factor: Current regional UV index suggests higher supplementation need.",
      "Immune link: Reported frequency of minor illness correlates with low calcitriol levels."
    ],
    description: "Based on your low sun exposure and muscle fatigue, you likely have a Vitamin D3 deficiency. Essential for immune health and bone density.",
    sources: ["D3 + K2 Supplement", "Mushrooms", "Safe Sunlight Exposure"]
  },
  "iron": {
    name: "Iron (Ferritin)",
    probability: 0.78,
    confidence: 82,
    reasoning: [
      "Respiratory link: Shortness of breath correlates with low hemoglobin oxygen transport.",
      "Fatigue index: Chronic tired state matches ferritin depletion markers.",
      "Activity level: High physical output requires higher iron turnover.",
      "Symptom cluster: Brittle nails/hair reported matches iron-deficiency patterns."
    ],
    description: "Your profile suggests low iron levels, affecting oxygen delivery. This explains the shortness of breath and chronic fatigue symptoms.",
    sources: ["Heme Iron (Red Meat)", "Lentils with Vitamin C", "Spinach"]
  },
  "vitamin_a": {
    name: "Vitamin A (Retinol)",
    probability: 0.72,
    confidence: 79,
    reasoning: [
      "Dermal indicator: Jaundice-like yellowing can relate to metabolism imbalance.",
      "Vision link: Night vision and dry eyes are primary indicators.",
      "Immune profile: Frequent infections suggest low mucosal integrity."
    ],
    description: "Your symptoms and yellowing indicators suggest Vitamin A/E imbalance or metabolic stress.",
    sources: ["Carrots", "Sweet Potatoes", "Cod Liver Oil"]
  },
  "zinc": {
    name: "Zinc / Electrolytes",
    probability: 0.68,
    confidence: 84,
    reasoning: [
      "Digestive link: Chronic diarrhea depletes zinc and electrolyte stores rapidly.",
      "Immune link: Sore throat and slow healing correlate with zinc deficiency.",
      "Metabolic factor: High stress increases zinc mobilization and excretion."
    ],
    description: "Frequent diarrhea and sore throats strongly correlate with Zinc and electrolyte depletion.",
    sources: ["Oysters", "Pumpkin Seeds", "Grass-fed Beef"]
  }
};

const Index = () => {
  const [isAssessing, setIsAssessing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/nutritionist") {
      setActiveTab("chat");
    } else if (location.pathname === "/assessments") {
      setActiveTab("assessments");
    } else if (location.pathname === "/reports") {
      setActiveTab("reports");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const onAssessmentComplete = (data: any) => {
    setIsAssessing(false);
    setAnalyzing(true);

    // Simulate premium AI analysis
    setTimeout(() => {
      let detected: any[] = [];
      const hasSymptoms = Object.values(data.symptoms).some(v => v);

      if (!hasSymptoms) {
        toast({
          title: "Assessment Complete",
          description: "No immediate deficiencies detected based on your input.",
        });
        setAnalyzing(false);
        setIsAssessing(false);
        return;
      }

      if (data.symptoms.fatigue && data.symptoms.breathlessness) detected.push(vitaminDeficiencies.iron);
      if (data.symptoms.tingling || data.diet === "vegan") detected.push(vitaminDeficiencies.vitamin_b12);
      if (data.lifestyle.low_sun || data.symptoms.bonePain) detected.push(vitaminDeficiencies.vitamin_d);
      if (data.symptoms.jaundice) detected.push(vitaminDeficiencies.vitamin_a);
      if (data.symptoms.diarrhea || data.symptoms.soreThroat) detected.push(vitaminDeficiencies.zinc);
      if (data.lifestyle.alcohol) detected.push(vitaminDeficiencies.vitamin_b12);

      if (detected.length === 0) detected.push(vitaminDeficiencies.vitamin_d);

      setResults(detected);
      setAssessmentCount(prev => prev + 1);
      setAnalyzing(false);

      setActiveTab("reports");
      toast({
        title: "AI Analysis Ready",
        description: `We've identified ${detected.length} potential optimization areas. Viewing clinical dossier.`,
      });
    }, 2500);
  };

  const handleExportPDF = () => {
    setIsReportModalOpen(true);
    toast({
      title: "Opening Clinical Dossier",
      description: "Preparing your high-fidelity medical report preview...",
    });
  };

  return (
    <div className="space-y-12">
      <DashboardHeader
        healthScore={results.length > 0 ? 68 : 94}
        riskLevel={results.length > 0 ? "Moderate" : "Low"}
        lastUpdated="Active"
        onExportPDF={handleExportPDF}
        onNewLog={() => setIsLogOpen(true)}
      />

      <div id="active-tabs-section" className="space-y-12 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="glass-morphism h-16 p-1 rounded-2xl border-white/5">
              <TabsTrigger
                value="overview"
                onClick={() => setActiveTab("overview")}
                className="rounded-xl px-8 h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Health Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="assessments"
                onClick={() => setActiveTab("assessments")}
                className="rounded-xl px-8 h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <ClipboardCheck className="w-5 h-5 mr-2" />
                Assessments
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                onClick={() => setActiveTab("reports")}
                className="rounded-xl px-8 h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Medical Reports
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                onClick={() => setActiveTab("chat")}
                className="rounded-xl px-8 h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Nutritionist
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-12">
            <DashboardMetrics
              assessmentCount={assessmentCount}
              deficiencyCount={results.length}
              healthScore={results.length > 0 ? 68 : 0}
              riskLevel={results.length > 0 ? "Moderate" : "N/A"}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-layer-1 p-8 rounded-[2rem] border border-white/5 space-y-4 relative overflow-hidden group">
                    <div className="hero-glow opacity-10 group-hover:opacity-20 transition-opacity" />
                    <h4 className="text-lg font-bold">Clinical Baseline</h4>
                    <p className="text-sm text-slate-500 italic">No critical anomalies detected in your current biometric stream.</p>
                    <Button onClick={() => setActiveTab("assessments")} variant="link" className="text-violet-400 p-0 h-auto font-bold tracking-widest text-[10px] uppercase">New Assessment &rarr;</Button>
                  </div>
                  <div className="glass-layer-1 p-8 rounded-[2rem] border border-white/5 space-y-4">
                    <h4 className="text-lg font-bold">DNA Synthesis</h4>
                    <p className="text-sm text-slate-500">Connect your genomic data for 10x deeper vitamin absorption mapping.</p>
                    <span className="text-violet-500/50 font-bold tracking-widest text-[10px] uppercase">Coming Soon</span>
                  </div>
                </div>

                <div className="glass-layer-1 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Sparkles className="text-emerald-400 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">System Status: Optimal</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Your metabolic profile is currently aligned with your target "Member Pro" benchmarks.
                    Vitamin D levels remain the primary optimization focus based on regional UV trends.
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                <SmartAlerts />
                <FutureRiskChart />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-12">
            <div className="max-w-4xl mx-auto py-10">
              <AnimatePresence mode="wait">
                {isAssessing ? (
                  <motion.div key="assessing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SymptomAssessment onComplete={onAssessmentComplete} />
                  </motion.div>
                ) : analyzing ? (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">
                    <IntelligencePerception
                      confidence={98}
                      reasoning={["Analyzing biomarker distribution...", "Correlating with clinical databases...", "Simulating nutrient interactions..."]}
                      isAnalyzing={true}
                    />
                  </motion.div>
                ) : (
                  <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-12 py-20 glass-layer-1 rounded-[3rem] border-dashed border-white/10">
                    <div className="w-24 h-24 rounded-3xl bg-violet-600/10 flex items-center justify-center mx-auto border border-violet-500/20">
                      <ClipboardCheck className="w-12 h-12 text-violet-400" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black text-white">Clinical Scan Station</h2>
                      <p className="text-slate-500 max-w-md mx-auto">Initialize a high-fidelity intelligence scan to detect nutrient gaps based on your symptoms and lifestyle baseline.</p>
                    </div>
                    <Button onClick={() => setIsAssessing(true)} className="h-16 px-12 bg-white text-black hover:bg-slate-200 rounded-2xl font-bold shadow-2xl shadow-white/20 text-lg">
                      Start Intelligent Assessment
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-12">
            {results.length > 0 ? (
              <AIResults results={results} onExport={handleExportPDF} />
            ) : (
              <div className="text-center py-40 glass-layer-1 rounded-[3rem] border border-white/5">
                <BarChart3 className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-500">No Assessment Reports Yet</h3>
                <p className="text-slate-600 mt-2">Complete an assessment to generate your first Clinical Health Dossier.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="chat">
            <div className="w-full">
              <VitaminChat deficiencyInfo={results[0]} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BiomarkerLog isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
      <HealthReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        results={results}
      />
    </div >
  );
};

export default Index;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { transferPOL, checkReceiverRisk } from "@/lib/blockchain";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Transaction() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState<any>(null);
  const { toast } = useToast();

  const handleCheckRisk = async () => {
    if (!receiver) return;
    setLoading(true);
    try {
      const risk = await checkReceiverRisk(receiver);
      setRiskData(risk);
      toast({
        title: "Risk Check Complete",
        description: risk.message || "Address analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check receiver risk",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!receiver || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter receiver address and amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const txHash = await transferPOL(receiver, amount);
      toast({
        title: "Transfer Successful",
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
      });
      setReceiver("");
      setAmount("");
      setRiskData(null);
    } catch (error: any) {
      toast({
        title: "Transfer Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-12 px-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <ArrowRight className="h-8 w-8 text-primary" />
            POL Transfer
          </CardTitle>
          <CardDescription>
            Send POL tokens through our secure Router contract with AI-powered risk detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="receiver">Receiver Address</Label>
            <div className="flex gap-2">
              <Input
                id="receiver"
                placeholder="0x..."
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="font-mono"
              />
              <Button
                onClick={handleCheckRisk}
                disabled={!receiver || loading}
                variant="outline"
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                Check Risk
              </Button>
            </div>
          </div>

          {riskData && (
            <Alert variant={riskData.risk === "high" ? "destructive" : "default"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Risk Level: {riskData.risk}</strong>
                <br />
                {riskData.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (POL)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button
            onClick={handleTransfer}
            disabled={!receiver || !amount || loading}
            className="w-full gap-2"
            size="lg"
          >
            {loading ? "Processing..." : "Transfer POL"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

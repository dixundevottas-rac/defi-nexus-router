import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vault, TrendingUp, ArrowDown, ArrowUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { stakePOL, withdrawPOL, getStakedBalance } from "@/lib/blockchain";

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [stakedBalance, setStakedBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadStakedBalance = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const balance = await getStakedBalance(accounts[0]);
          setStakedBalance(balance);
        }
      }
    } catch (error) {
      console.error("Failed to load staked balance:", error);
    }
  };

  useEffect(() => {
    loadStakedBalance();
  }, []);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setLoading(true);
    try {
      const txHash = await stakePOL(stakeAmount);
      toast({
        title: "Stake Successful",
        description: `Staked ${stakeAmount} POL successfully`,
      });
      setStakeAmount("");
      await loadStakedBalance();
    } catch (error: any) {
      toast({
        title: "Stake Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    setLoading(true);
    try {
      const txHash = await withdrawPOL(withdrawAmount);
      toast({
        title: "Withdrawal Successful",
        description: `Withdrew ${withdrawAmount} POL successfully`,
      });
      setWithdrawAmount("");
      await loadStakedBalance();
    } catch (error: any) {
      toast({
        title: "Withdrawal Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-12 px-4">
      <div className="space-y-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Vault className="h-8 w-8 text-primary" />
              Staking Dashboard
            </CardTitle>
            <CardDescription>
              Stake your POL tokens to earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Staked</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{parseFloat(stakedBalance).toFixed(4)} POL</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>APY</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">12.5%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Estimated Rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {(parseFloat(stakedBalance) * 0.125).toFixed(4)} POL/year
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="stake">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stake" className="gap-2">
                  <ArrowUp className="h-4 w-4" />
                  Stake
                </TabsTrigger>
                <TabsTrigger value="withdraw" className="gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Withdraw
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stake" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="stake-amount">Amount to Stake (POL)</Label>
                  <Input
                    id="stake-amount"
                    type="number"
                    step="0.01"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleStake}
                  disabled={!stakeAmount || loading}
                  className="w-full gap-2"
                  size="lg"
                >
                  {loading ? "Processing..." : "Stake POL"}
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount to Withdraw (POL)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    step="0.01"
                    placeholder="0.0"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Available: {parseFloat(stakedBalance).toFixed(4)} POL
                  </p>
                </div>
                <Button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || loading}
                  className="w-full gap-2"
                  size="lg"
                  variant="outline"
                >
                  {loading ? "Processing..." : "Withdraw POL"}
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

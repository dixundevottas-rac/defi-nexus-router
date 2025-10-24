import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const chains = [
  { id: "polygon", name: "Polygon", icon: "🟣" },
  { id: "ethereum", name: "Ethereum", icon: "⟠" },
  { id: "bsc", name: "BSC", icon: "🟡" },
  { id: "avalanche", name: "Avalanche", icon: "🔺" },
  { id: "arbitrum", name: "Arbitrum", icon: "🔵" },
];

export default function CrossChain() {
  const [fromChain, setFromChain] = useState("polygon");
  const [toChain, setToChain] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const handleTransfer = () => {
    // Cross-chain transfer simulation
    console.log("Cross-chain transfer:", { fromChain, toChain, amount, address });
  };

  return (
    <div className="container max-w-2xl py-12 px-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Network className="h-8 w-8 text-primary" />
            Cross-Chain Bridge
          </CardTitle>
          <CardDescription>
            Transfer assets seamlessly across different blockchain networks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Network className="h-4 w-4" />
            <AlertDescription>
              Cross-chain transfers typically take 5-15 minutes to complete
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>From Chain</Label>
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <span className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        {chain.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>To Chain</Label>
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id} disabled={chain.id === fromChain}>
                      <span className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        {chain.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cross-amount">Amount</Label>
              <Input
                id="cross-amount"
                type="number"
                step="0.01"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cross-address">Destination Address</Label>
              <Input
                id="cross-address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="pt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Bridge Fee</span>
                <span>0.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time</span>
                <span>~10 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>You will receive</span>
                <span className="font-medium text-foreground">
                  {amount ? (parseFloat(amount) * 0.999).toFixed(4) : "0.0"} tokens
                </span>
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={!amount || !address}
              className="w-full gap-2"
              size="lg"
            >
              Initiate Bridge Transfer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

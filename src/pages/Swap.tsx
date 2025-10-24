import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, TrendingUp } from "lucide-react";

const tokens = [
  { symbol: "POL", name: "Polygon", rate: 1 },
  { symbol: "ETH", name: "Ethereum", rate: 0.0005 },
  { symbol: "USDC", name: "USD Coin", rate: 0.85 },
  { symbol: "USDT", name: "Tether", rate: 0.85 },
];

export default function Swap() {
  const [fromToken, setFromToken] = useState("POL");
  const [toToken, setToToken] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const calculateSwap = (value: string, from: string, to: string) => {
    const fromRate = tokens.find((t) => t.symbol === from)?.rate || 1;
    const toRate = tokens.find((t) => t.symbol === to)?.rate || 1;
    const result = (parseFloat(value) * fromRate) / toRate;
    return result.toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value) {
      setToAmount(calculateSwap(value, fromToken, toToken));
    } else {
      setToAmount("");
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    if (fromAmount) {
      setToAmount(fromAmount);
      setFromAmount(calculateSwap(fromAmount, toToken, tempToken));
    }
  };

  return (
    <div className="container max-w-2xl py-12 px-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Token Swap Simulator
          </CardTitle>
          <CardDescription>
            Simulate token swaps with real-time conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>From</Label>
            <div className="flex gap-2">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <div className="flex gap-2">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="flex-1 bg-muted"
              />
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Exchange Rate</span>
              <span>1 {fromToken} ≈ {calculateSwap("1", fromToken, toToken)} {toToken}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Fee</span>
              <span>0.3%</span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Preview Swap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

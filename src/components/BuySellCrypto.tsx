import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";

const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price";
const TAX_RATE = 0.30;

const cryptoOptions = [
  { id: "matic-network", symbol: "MATIC", name: "Polygon" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
];

export const BuySellCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [selectedCrypto]);

  const fetchPrice = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}?ids=${selectedCrypto}&vs_currencies=inr`
      );
      const data = await response.json();
      setPrice(data[selectedCrypto]?.inr || 0);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    const tokenPrice = amountNum * price;
    const taxAmount = tokenPrice * TAX_RATE;
    const finalTotal = tokenPrice + taxAmount;
    return { tokenPrice, taxAmount, finalTotal };
  };

  const handleTransaction = (type: "buy" | "sell") => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const { tokenPrice, taxAmount, finalTotal } = calculateTotal();
    const crypto = cryptoOptions.find(c => c.id === selectedCrypto);

    toast({
      title: `${type === "buy" ? "Purchase" : "Sale"} Confirmed`,
      description: (
        <div className="mt-2 space-y-1">
          <p>{amount} {crypto?.symbol} at ₹{tokenPrice.toFixed(2)}</p>
          <p>Tax (30%): ₹{taxAmount.toFixed(2)}</p>
          <p className="font-bold">Total: ₹{finalTotal.toFixed(2)}</p>
        </div>
      ),
    });

    setAmount("");
  };

  const { tokenPrice, taxAmount, finalTotal } = calculateTotal();
  const crypto = cryptoOptions.find(c => c.id === selectedCrypto);

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Buy/Sell Cryptocurrency
        </CardTitle>
        <CardDescription>Trade crypto with real-time INR rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crypto-select">Select Cryptocurrency</Label>
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger id="crypto-select">
              <SelectValue placeholder="Select crypto" />
            </SelectTrigger>
            <SelectContent>
              {cryptoOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.symbol} - {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-muted-foreground">Current Price</p>
          <p className="text-2xl font-bold text-primary">
            ₹{price.toFixed(2)} INR
          </p>
          <p className="text-xs text-muted-foreground mt-1">per {crypto?.symbol}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({crypto?.symbol})</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.001"
          />
        </div>

        {amount && parseFloat(amount) > 0 && (
          <div className="space-y-2 p-4 rounded-lg bg-secondary/20 border border-secondary/30">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Token Price:</span>
              <span className="font-semibold">₹{tokenPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (30%):</span>
              <span className="font-semibold text-destructive">₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-border pt-2">
              <span className="font-bold">Final Total:</span>
              <span className="font-bold text-primary">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => handleTransaction("buy")}
            className="flex-1 gap-2"
            disabled={loading}
          >
            <TrendingUp className="h-4 w-4" />
            Buy
          </Button>
          <Button
            onClick={() => handleTransaction("sell")}
            variant="secondary"
            className="flex-1 gap-2"
            disabled={loading}
          >
            <TrendingDown className="h-4 w-4" />
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

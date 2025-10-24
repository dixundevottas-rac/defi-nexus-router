import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { connectWallet, getBalance } from "@/lib/blockchain";
import { useToast } from "@/hooks/use-toast";

export const WalletButton = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      const addr = await connectWallet();
      if (addr) {
        setAddress(addr);
        const bal = await getBalance(addr);
        setBalance(bal);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${addr.slice(0, 6)}...${addr.slice(-4)}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          getBalance(accounts[0]).then(setBalance);
        } else {
          setAddress("");
          setBalance("0");
        }
      });
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      {address ? (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <p className="text-xs text-muted-foreground">
              {parseFloat(balance).toFixed(4)} POL
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
      ) : (
        <Button onClick={handleConnect} className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Shield, Network, TrendingUp } from "lucide-react";
import { BuySellCrypto } from "@/components/BuySellCrypto";

const Index = () => {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-pulse" />
        <div className="container relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            DeFi Router Portal
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your gateway to secure, AI-powered blockchain transactions across multiple networks
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/transaction">
              <Button size="lg" className="gap-2">
                Start Trading <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>Execute transactions in seconds with optimized routing</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Security</CardTitle>
              <CardDescription>Advanced risk detection protects every transaction</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Network className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Multi-Chain</CardTitle>
              <CardDescription>Bridge assets across 5+ blockchain networks</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Earn Rewards</CardTitle>
              <CardDescription>Stake tokens and earn up to 12.5% APY</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BuySellCrypto />
          <div className="space-y-6">
            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Start your DeFi journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/transaction" className="block">
                  <Button className="w-full" size="lg">Send POL Tokens</Button>
                </Link>
                <Link to="/swap" className="block">
                  <Button className="w-full" variant="secondary" size="lg">Token Swap</Button>
                </Link>
                <Link to="/stake" className="block">
                  <Button className="w-full" variant="outline" size="lg">Stake & Earn</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

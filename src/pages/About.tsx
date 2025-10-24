import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users, Shield, Zap, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <Card className="border-2 mb-8">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Info className="h-8 w-8 text-primary" />
            About DeFi Router
          </CardTitle>
          <CardDescription>
            Leading cryptocurrency transfer platform revolutionizing decentralized finance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              DeFi Router is a cryptocurrency transfer platform based in Singapore that offers
              various financial services, including an app, exchange, and non-custodial DeFi wallet,
              NFT marketplace, and direct payment service in cryptocurrency.
            </p>
            <p className="text-lg leading-relaxed">
              As of June 2023, the company reportedly had over <strong className="text-primary">100 million customers</strong> and{" "}
              <strong className="text-primary">4,000 employees</strong>, making us one of the fastest-growing
              DeFi platforms in the world.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Global Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Serving millions of users worldwide with secure, fast, and reliable blockchain
              transactions across multiple networks.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>AI-Powered Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Advanced AI risk detection system analyzes every transaction to protect users
              from scams and fraudulent addresses.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Optimized smart contracts and efficient routing ensure your transactions are
              processed quickly with minimal gas fees.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Multi-Chain Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Seamlessly bridge assets across Polygon, Ethereum, BSC, Avalanche, and Arbitrum
              with our advanced cross-chain technology.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 mt-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To democratize access to decentralized finance by providing secure, user-friendly,
              and innovative blockchain solutions that empower individuals to take control of
              their financial future.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

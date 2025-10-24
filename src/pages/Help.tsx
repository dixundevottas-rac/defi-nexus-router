import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Help() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-primary" />
            Help & Support
          </CardTitle>
          <CardDescription>
            Find answers to common questions about DeFi Router
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I connect my wallet?</AccordionTrigger>
              <AccordionContent>
                Click the "Connect Wallet" button in the top right corner. Make sure you have MetaMask
                installed in your browser. You'll be prompted to approve the connection and select
                which account you want to use.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What is the AI risk detection feature?</AccordionTrigger>
              <AccordionContent>
                Our AI-powered risk detection analyzes receiver addresses before you send tokens.
                It checks for suspicious patterns, known scam addresses, and provides a risk assessment
                to help you make informed decisions about your transactions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How does staking work?</AccordionTrigger>
              <AccordionContent>
                Staking allows you to lock up your POL tokens in our smart contract to earn rewards.
                Currently offering 12.5% APY. You can stake and withdraw at any time. Rewards are
                calculated continuously and can be claimed whenever you withdraw.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What fees does DeFi Router charge?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Token transfers: Gas fees only (no platform fee)</li>
                  <li>Swap: 0.3% per transaction</li>
                  <li>Cross-chain bridge: 0.1% bridge fee</li>
                  <li>Staking: No fees for staking or withdrawing</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is my wallet safe?</AccordionTrigger>
              <AccordionContent>
                Yes. DeFi Router is non-custodial, meaning you maintain full control of your private
                keys. We never have access to your funds. All smart contracts are audited and
                transactions are secured by blockchain technology.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How long do cross-chain transfers take?</AccordionTrigger>
              <AccordionContent>
                Cross-chain transfers typically complete within 5-15 minutes, depending on network
                congestion and the specific chains involved. You can track your transfer status
                using the transaction hash provided after initiation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>What networks are supported?</AccordionTrigger>
              <AccordionContent>
                DeFi Router currently supports Polygon, Ethereum, BSC (Binance Smart Chain),
                Avalanche, and Arbitrum. We're continuously working to add more networks based
                on community demand.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>What if I encounter an error?</AccordionTrigger>
              <AccordionContent>
                First, ensure your wallet has sufficient funds for both the transaction and gas fees.
                Try refreshing the page and reconnecting your wallet. If the problem persists,
                please contact our support team with details about the error message you received.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-accent/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Still need help?</h3>
                <p className="text-muted-foreground">
                  Our support team is here to assist you with any questions or issues
                </p>
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Button>
                <p className="text-sm text-muted-foreground">
                  Or email us at <a href="mailto:support@defirouter.com" className="text-primary hover:underline">support@defirouter.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

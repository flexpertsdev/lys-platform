import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Globe, Users, Package } from 'lucide-react';
import { Container, Grid, GridItem, Stack } from '../components/ui/Grid';
import { Button } from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'CPNP Certified',
      description: 'All products comply with UK/EU cosmetic regulations with verified certifications.'
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: 'Global Wholesale',
      description: 'Connect with authentic Korean beauty brands for international B2B trade.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Verified Partners',
      description: 'Curated network of trusted suppliers and retailers with proven track records.'
    },
    {
      icon: <Package className="h-8 w-8 text-primary" />,
      title: 'MOQ Management',
      description: 'Smart tools to help you meet minimum order quantities efficiently.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Premium Brands' },
    { value: '1000+', label: 'Verified Products' },
    { value: '£5M+', label: 'Monthly GMV' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-base-100 to-accent/10 py-3xl">
        <Container>
          <Grid cols={2} gap="2xl" align="center">
            <GridItem colSpan={2} className="lg:col-span-1">
              <Stack spacing="lg">
                <Badge variant="primary" size="lg">Invite-Only B2B Platform</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight">
                  Premium K-Beauty
                  <span className="text-primary"> Wholesale</span> Marketplace
                </h1>
                <p className="text-xl text-base-content/70">
                  Connect with verified Korean beauty brands. All products CPNP certified 
                  for UK/EU markets with transparent MOQ management.
                </p>
                <div className="flex flex-col sm:flex-row gap-md pt-lg">
                  <Link to="/catalog">
                    <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                      Browse Products
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg">
                      Request Access
                    </Button>
                  </Link>
                </div>
              </Stack>
            </GridItem>
            <GridItem colSpan={2} className="lg:col-span-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"></div>
                <img 
                  src="https://via.placeholder.com/600x400" 
                  alt="K-Beauty Products" 
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </GridItem>
          </Grid>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-xl bg-base-200">
        <Container>
          <Grid cols={4} gap="lg">
            {stats.map((stat, idx) => (
              <GridItem key={idx} colSpan={1} className="text-center">
                <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-base-content/70 mt-sm">{stat.label}</p>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-3xl">
        <Container>
          <Stack spacing="2xl">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-md">
                Why Choose Loving Your Skin?
              </h2>
              <p className="text-lg text-base-content/70">
                The trusted B2B platform connecting international retailers 
                with premium Korean beauty brands.
              </p>
            </div>
            
            <Grid cols={2} gap="lg">
              {features.map((feature, idx) => (
                <GridItem key={idx} colSpan={1}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardBody>
                      <Stack spacing="md">
                        <div className="p-md bg-primary/10 rounded-lg w-fit">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="text-base-content/70">{feature.description}</p>
                      </Stack>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-3xl bg-gradient-to-r from-primary to-accent text-primary-content">
        <Container>
          <Stack spacing="lg" align="center" className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your K-Beauty Business?
            </h2>
            <p className="text-xl opacity-90">
              Join our exclusive network of verified retailers and access 
              premium Korean beauty products with guaranteed authenticity.
            </p>
            <div className="flex flex-col sm:flex-row gap-md pt-lg">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Request Invitation
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="ghost" className="text-primary-content hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </Stack>
        </Container>
      </section>
    </div>
  );
};
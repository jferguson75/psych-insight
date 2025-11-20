import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Fixed Background Image */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Dark Overlay */}
        <View style={styles.overlay} />
        
        {/* Scrollable Content Container */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Centered Content Card */}
          <View style={styles.contentCard}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🧠</Text>
              </View>
              <Text style={styles.title}>PSYCHE INSIGHT</Text>
              <Text style={styles.subtitle}>
                Discover Your Inner Self Through AI-Guided Reflection
              </Text>
            </View>

            {/* Purpose Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What is Psyche Insight?</Text>
              <Text style={styles.sectionText}>
                Psyche Insight is an AI-powered psychological self-discovery tool that guides you through 
                deep, meaningful conversations about yourself. Using advanced AI, it asks thought-provoking 
                questions and adapts to your responses, helping you uncover hidden patterns, beliefs, and 
                motivations that shape your life.
              </Text>
            </View>

            {/* Features Section - 2x2 Grid */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              <View style={styles.featureGrid}>
                <FeatureTile 
                  icon="💬"
                  title="Thoughtful Questions"
                  description="Answer 10 core psychological questions designed by experts"
                />
                <FeatureTile 
                  icon="🤖"
                  title="AI-Powered Insights"
                  description="AI adapts and asks deeper follow-up questions based on your answers"
                />
                <FeatureTile 
                  icon="🎤"
                  title="Voice or Text"
                  description="Respond using your voice or by typing - whatever feels natural"
                />
                <FeatureTile 
                  icon="🔒"
                  title="Private & Secure"
                  description="Your responses are stored locally on your device"
                />
              </View>
            </View>

            {/* Audience Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Who Is This For?</Text>
              <View style={styles.audienceList}>
                <AudienceItem text="Anyone seeking deeper self-understanding" />
                <AudienceItem text="People working on personal growth and development" />
                <AudienceItem text="Those exploring their values, fears, and motivations" />
                <AudienceItem text="Individuals preparing for therapy or coaching" />
                <AudienceItem text="Anyone curious about what drives their behavior" />
              </View>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Your journey to self-discovery starts here
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const FeatureTile = ({ icon, title, description }) => (
  <View style={styles.featureTile}>
    <Text style={styles.tileIcon}>{icon}</Text>
    <Text style={styles.tileTitle}>{title}</Text>
    <Text style={styles.tileDescription}>{description}</Text>
  </View>
);

const AudienceItem = ({ text }) => (
  <View style={styles.audienceItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.audienceText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: Platform.OS === 'web' ? 20 : 24,
  },
  contentCard: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 24,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
    ...(Platform.OS === 'web' && {
      backdropFilter: 'blur(10px)',
    }),
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  iconText: {
    fontSize: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 26,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  featureTile: {
    width: Platform.OS === 'web' ? 'calc(50% - 8px)' : '48%',
    minWidth: 200,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    alignItems: 'center',
    minHeight: 180,
  },
  tileIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  tileDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    textAlign: 'center',
  },
  audienceList: {
    gap: 12,
    marginTop: 8,
  },
  audienceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  bullet: {
    fontSize: 18,
    color: '#a78bfa',
    marginRight: 12,
    marginTop: 2,
  },
  audienceText: {
    flex: 1,
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  ctaContainer: {
    marginTop: 20,
    marginBottom: 40,
    gap: 16,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#c4b5fd',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});

import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServiceOverview } from '../components/home/ServiceOverview';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { LegislativeHighlights } from '../components/home/LegislativeHighlights';
import { MediaFeedSection } from '../components/media/MediaFeedSection';
import { CommunityCTA } from '../components/home/CommunityCTA';
import {
  getProjects,
  getNewsArticles,
  getLegislativeActivities,
  getSiteSettings,
  subscribeToStore,
} from '../lib/storage';

export const HomePage: React.FC = () => {
  const [projects, setProjects] = useState(getProjects());
  const [news, setNews] = useState(getNewsArticles());
  const [activities, setActivities] = useState(getLegislativeActivities());
  const [settings, setSettings] = useState(getSiteSettings());

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setProjects(getProjects());
      setNews(getNewsArticles());
      setActivities(getLegislativeActivities());
      setSettings(getSiteSettings());
    });
    return unsubscribe;
  }, []);

  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Public Service Overview (4 Pillars) */}
      <ServiceOverview />

      {/* Featured Projects & Initiatives */}
      <FeaturedProjects projects={projects} />

      {/* Legislative Activities Highlights */}
      <LegislativeHighlights activities={activities} />

      {/* Live Facebook Feed & Media Section */}
      <MediaFeedSection
        feedConfig={settings.feedConfig}
        latestNews={news}
      />

      {/* Citizen Petition & Engagement CTA */}
      <CommunityCTA />
    </main>
  );
};

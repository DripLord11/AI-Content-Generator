# ClientWinsAI - Video Sales Letter Script & Recording Guide

## Overview
This document provides a complete VSL (Video Sales Letter) script and step-by-step recording instructions for demonstrating ClientWinsAI at the Lovable Hackathon.

---

## Recording Setup

### Equipment Needed
- Screen recording software (OBS, Loom, or similar)
- Microphone (built-in or external)
- Clean browser with the app running locally (`npm run dev`)

### Pre-Recording Checklist
- [ ] Clear browser cache/history for clean demo
- [ ] Reset settings to default (clear localStorage)
- [ ] Have test client story ready to paste
- [ ] Close unnecessary browser tabs
- [ ] Disable notifications
- [ ] Set screen resolution to 1920x1080 or 1280x720

---

## VSL Script (2-3 Minutes)

### INTRO (15 seconds)
```
[SCREEN: Homepage of ClientWinsAI]

"What if I told you that you could launch a fully-branded AI-powered
case study agency... in under 5 minutes?

I'm about to show you ClientWinsAI - an agency-in-a-box that transforms
client success stories into professional case studies, social media content,
and video scripts... all powered by AI."
```

### PROBLEM (20 seconds)
```
[SCREEN: Stay on homepage, maybe scroll slightly]

"Here's the problem most agencies face: Creating case studies is tedious.
You interview clients, transcribe conversations, write drafts, create
social posts, design graphics... it takes HOURS per case study.

And if you're trying to start an agency? The setup alone - building a
website, creating intake forms, setting up a dashboard - can take weeks."
```

### SOLUTION (20 seconds)
```
[SCREEN: Scroll to show features/preview cards]

"ClientWinsAI solves both problems. It's a complete, white-label agency
platform that you can customize with YOUR brand in minutes.

Watch this..."
```

### DEMO PART 1: Branding (30 seconds)
```
[SCREEN: Navigate to /settings]

"Let me show you how fast you can make this YOUR agency."

[ACTION: Click on Branding tab, change business name]

"I'll change the business name to... 'Success Stories Pro'"

[ACTION: Change tagline and maybe a color]

"Update the tagline... change our accent color to match our brand..."

[ACTION: Click Save, then navigate back to homepage]

"And just like that - it's now MY branded agency. No code. No developers.
30 seconds."
```

### DEMO PART 2: AI Power (45 seconds)
```
[SCREEN: Navigate to /intake]

"Now let me show you the magic - the AI content generation."

[ACTION: Paste or type a client story in the form]

"I'll paste in a quick client success story..."

[PASTE THIS EXAMPLE TEXT]:
"We helped TechStart Inc increase their monthly revenue from $50,000 to
$200,000 in just 6 months by implementing our automated sales funnel.
Their founder Sarah said it was the best investment they ever made."

[ACTION: Click Generate]

"One click... and watch what happens."

[SCREEN: Show AI generating content - case study, LinkedIn, Twitter, video script]

"In seconds, I have a complete case study, LinkedIn post, Twitter thread,
AND a video script. All professionally written, all ready to publish."

[ACTION: If Blotato is configured, show the Auto-Post button]

"And if I connect Blotato, I can auto-post this content directly to
social media with one click."
```

### DEMO PART 3: Dashboard (20 seconds)
```
[SCREEN: Navigate to /admin]

"On the back end, I have a professional dashboard to manage everything."

[ACTION: Click through Overview, Projects, Analytics tabs]

"Track projects, manage leads, view analytics... everything an agency needs
to scale. And it all comes ready to deploy."
```

### TECH FLEXIBILITY (15 seconds)
```
[SCREEN: Navigate to /settings > AI Providers tab]

"One more thing - you're not locked into any single AI provider.
Use Claude, GPT-4, or Gemini. Switch anytime. YOUR choice."
```

### CLOSE (15 seconds)
```
[SCREEN: Homepage or settings > Deploy tab]

"ClientWinsAI. A complete AI-powered case study agency that you can
brand, customize, and deploy in minutes.

Start turning client wins into content at scale.

Thank you for watching."
```

---

## Recording Flow Checklist

### Scene-by-Scene Breakdown

| Scene | Duration | Location | Action |
|-------|----------|----------|--------|
| 1 | 15s | Homepage | Pan around, show hero |
| 2 | 20s | Homepage | Stay put, deliver problem |
| 3 | 20s | Homepage | Scroll to preview cards |
| 4 | 30s | /settings | Change branding live |
| 5 | 45s | /intake | Generate AI content |
| 6 | 20s | /admin | Tour dashboard |
| 7 | 15s | /settings | Show AI providers |
| 8 | 15s | Homepage | Closing shot |

### Test Client Story (Copy-Paste Ready)
```
We partnered with GreenLeaf Marketing to revamp their entire digital
presence. Within 90 days, they saw a 340% increase in qualified leads
and their conversion rate jumped from 2.1% to 8.7%. CEO Michael Torres
called it "the transformation that saved our business." They've since
expanded from 5 employees to 23 and opened two new offices.
```

---

## Post-Recording: Adding VSL to Site

### Option 1: YouTube/Vimeo Embed (Recommended)

1. Upload your video to YouTube or Vimeo
2. Get the embed URL
3. Add to homepage - edit `components/landing/hero.tsx`:

```tsx
{/* Add after the tagline, before the buttons */}
<div className="mt-8 max-w-3xl mx-auto">
  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-2xl">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
      title="ClientWinsAI Demo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>
```

### Option 2: Self-Hosted Video

1. Export video as MP4 (recommended: under 50MB)
2. Place in `public/videos/demo.mp4`
3. Add to hero section:

```tsx
<div className="mt-8 max-w-3xl mx-auto">
  <video
    className="w-full rounded-xl shadow-2xl"
    controls
    poster="/videos/demo-thumbnail.jpg"
  >
    <source src="/videos/demo.mp4" type="video/mp4" />
  </video>
</div>
```

### Option 3: Loom Embed

1. Record directly in Loom
2. Copy the embed code
3. Add to hero section similar to YouTube option

---

## Tips for a Great Recording

1. **Speak clearly and at a moderate pace** - Excitement is good, but clarity is better
2. **Pause briefly between sections** - Makes editing easier
3. **Move your mouse deliberately** - Fast cursor movements are hard to follow
4. **Have your script visible** - Use a second monitor or printed copy
5. **Do a test run first** - Record 30 seconds, play it back, check audio levels
6. **Record in one take if possible** - But don't stress, editing is always an option

---

## Quick Reference: Key URLs

- Homepage: `http://localhost:3000`
- Settings: `http://localhost:3000/settings`
- Intake Form: `http://localhost:3000/intake`
- Admin Dashboard: `http://localhost:3000/admin`

---

Good luck with your recording! 🎬

// ---------------------------------------------------------------------------
// mockListings.js
//
// Stand-in for a "listings table". In production this would be fetched with
// something like `GET /api/listings?skill=react&location=georgetown`.
//
// Each listing also carries `views` and `viewHistory` — a real backend would
// increment these server-side every time someone opens the listing, and the
// employer dashboard chart would just read the aggregated numbers back.
// ---------------------------------------------------------------------------

export const mockListings = [
  {
    id: "l1",
    employerId: "u3",
    company: "Kedai Kopi Nadia",
    title: "Weekend Barista",
    description:
      "Help run the espresso bar on Saturday and Sunday mornings. Training given — we just need someone reliable and friendly with customers.",
    tags: ["Customer Service", "Weekend", "No Experience Needed"],
    location: "Georgetown, Penang",
    payMin: 12,
    payMax: 15,
    payUnit: "hour",
    type: "Part-time",
    postedAt: "2026-08-18",
    views: 41,
    viewHistory: [3, 5, 6, 8, 4, 7, 8], // last 7 days, oldest first
  },
  {
    id: "l2",
    employerId: "u4",
    company: "BrightPixel Studio",
    title: "Junior Frontend Developer (Internship)",
    description:
      "3-month internship building UI components in React for client projects. Good fit if you know the basics of HTML/CSS/JS and want real-world practice.",
    tags: ["React", "Internship", "Remote-friendly"],
    location: "Bukit Mertajam, Penang",
    payMin: 800,
    payMax: 1200,
    payUnit: "month",
    type: "Internship",
    postedAt: "2026-08-20",
    views: 76,
    viewHistory: [5, 9, 12, 10, 14, 13, 13],
  },
  {
    id: "l3",
    employerId: "u4",
    company: "BrightPixel Studio",
    title: "Social Media Copywriter",
    description:
      "Write short-form captions and ad copy for 4-5 client accounts. Flexible hours, paid per post with a monthly retainer option.",
    tags: ["Copywriting", "Marketing", "Flexible Hours"],
    location: "Remote",
    payMin: 300,
    payMax: 600,
    payUnit: "month",
    type: "Freelance",
    postedAt: "2026-08-24",
    views: 29,
    viewHistory: [1, 2, 4, 3, 6, 6, 7],
  },
  {
    id: "l4",
    employerId: "u3",
    company: "Kedai Kopi Nadia",
    title: "Math Tutor for Secondary School Students",
    description:
      "Tutor 2 students (Form 3 and Form 4) twice a week at our shop after closing hours. SPM syllabus experience preferred.",
    tags: ["Tutoring", "Math", "Evenings"],
    location: "Georgetown, Penang",
    payMin: 25,
    payMax: 35,
    payUnit: "hour",
    type: "Part-time",
    postedAt: "2026-08-27",
    views: 18,
    viewHistory: [0, 1, 3, 2, 4, 4, 4],
  },
];

import { useRouter } from "expo-router";
import { LandingHero } from "../components/ui";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    // TODO: Navigate to results page with the search query
    console.log("Search query:", query);
    // router.push(`/results/${encodeURIComponent(query)}`);
  };

  return <LandingHero onSearch={handleSearch} />;
}

import { PageProps } from "fresh";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <nav style="background-color: #f9fafb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 1rem 0;">
        <div style="max-width: 80rem; margin: 0 auto; padding: 0 1rem;">
          <div class="player-nav" style="justify-content: center;">
            <a href="/" style="flex: 0;">Home</a>
            <a href="/matches" style="flex: 0;">Matches</a>
          </div>
        </div>
      </nav>
      <main>
        <Component />
      </main>
    </div>
  );
}

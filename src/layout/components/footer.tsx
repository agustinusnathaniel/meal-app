export const Footer = () => {
  return (
    <footer className="text-center py-8 flex flex-col gap-2">
      <p>
        {new Date().getFullYear()} -{' '}
        <a
          href="https://agustinusnathaniel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          agustinusnathaniel.com
        </a>
      </p>

      {/* <div className="text-sm text-gray-500 flex flex-col gap-0">
        <p>
          Powered by:{' '}
          <a
            href="https://www.themealdb.com/?ref=meal-app.sznm.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheMealDB
          </a>
        </p>
        <p className="text-xs">
          Built with:{' '}
          <a href="https://intentui.com/?ref=meal-app.sznm.dev">Intent UI</a>
          {', '}
          <a href="https://tanstack.com/?ref=meal-app.sznm.dev">
            TanStack [Router, Query, Pacer]
          </a>
        </p>
      </div> */}
    </footer>
  );
};

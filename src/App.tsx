import { useState } from "react";

import { Toaster } from "sonner";
import { Route, Switch } from "wouter";

import { Produtos } from "./app/(private)/Produtos/Produtos";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-page-bg font-sans text-light-text antialiased dark:bg-dark-page dark:text-dark-text">
        <Toaster richColors position="top-right" theme={dark ? "dark" : "light"} />
        <Switch>
          <Route path="/">
            <Produtos dark={dark} onToggleTheme={() => setDark((d) => !d)} />
          </Route>
          <Route path="/produtos">
            <Produtos dark={dark} onToggleTheme={() => setDark((d) => !d)} />
          </Route>
          <Route>
            <div className="flex h-screen items-center justify-center">
              <p className="text-gray-400">Página não encontrada.</p>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

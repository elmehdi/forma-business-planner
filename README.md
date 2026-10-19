# Forma

A considered workspace for business plans. No dependencies or hosted database required.

## Run locally

Install Node.js 18 or newer, then from this folder:

```sh
npm start
```

Open http://localhost:3000. Example plans are created on first launch. Use Workspace settings to choose your display name, then create your own plans. This name labels ownership; it is not authentication.

## What works

- Seven business plan sections with autosaved drafts.
- Optimistic, realistic, and pessimistic assumptions for each plan.
- Twelve-month revenue, operating profit, cash balances, and operating break-even.
- Named version snapshots, snapshot inspection, and restore with an automatic safety snapshot.
- JSON plan export/import and workspace backups; forecast CSV export.
- USD, MAD, EUR, and GBP; searchable plans and an ownership filter.

## Two people, one private GitHub repository

Plans live in `data/plans/<plan-id>.json`. Each plan includes its draft, assumptions, and saved versions. Keep this directory tracked in Git. SQLite is unnecessary: binary database files are awkward to compare and merge in Git, while these JSON records are readable.

Create a **private** repository and put this project in it. Each person clones the repository and runs Forma locally. Choose separate display names in Workspace settings and normally edit your own plans.

Before a work session, stop the local server and pull the latest changes. After pulling, restart and refresh the app. After editing, wait for “All changes saved,” then commit and push:

```sh
git add data/
git commit -m "Update my business plan"
git push
```

Your collaborator pulls, restarts, and refreshes to see your plans. GitHub setup and synchronization are manual; the app never pushes or pulls for you. Coordinate before both editing the same plan. Resolve any JSON merge conflict before starting the app. Snapshots are planning milestones; Git commits provide an additional audit trail. Import warns before replacing an existing plan and offers a backup.

The server binds to loopback and is designed for a trusted local computer, not public server hosting. A display name is a convenience, not a security boundary. Both collaborators can view/edit all files in their clone.

## Hosted preview

The static `dist/` app can also be hosted. Without the local Node server, it saves in browser localStorage and supports JSON export/import. Browser data is specific to the current browser and device; it is **not synchronized** or shared by a link. Export regular backups. The hosted preview and local workspace do not automatically synchronize. Import an export to transfer a plan.

## Forecast method

Month 1 revenue is initial monthly revenue × scenario demand multiplier. Each subsequent month compounds by that scenario’s growth rate. Monthly costs are fixed costs + revenue × variable cost percentage. Operating profit is revenue minus costs. Ending cash is starting cash plus cumulative operating profit. Operating break-even is the first profitable operating month. Taxes, capital expenditure, financing, depreciation, seasonality, and working-capital timing are excluded. These are transparent planning estimates, not accounting statements.

## Checks

```sh
npm test
```

Tests cover forecast math, negative cash, validation, and non-destructive snapshots. No package installation or build is needed.

Git’s text/binary merge behavior is documented in the [Git attributes reference](https://git-scm.com/docs/gitattributes).

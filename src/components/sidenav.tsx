import { Tab, useTab } from '../context/tab-context'

const tabs: Tab[] = [1, 2, 3, 4, 5]

export default function Sidenav() {
	const { tab, setTab } = useTab()

	return (
		<div className="m-4">
			<ul className="list-none">
				{tabs.map((e) => (
					<li
						key={e}
						onClick={() => setTab(e)}
						className={`hover:bg-neutral-100 ${
							tab === e ? 'bg-neutral-200' : 'bg-white'
						} mb-2 flex flex-col items-center justify-center rounded-xl p-2`}
					>
						<p className="text-md text-neutral-900 ">{e}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

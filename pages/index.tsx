import type { NextPage } from 'next'
import InboxLayout from '../components/inbox-layout'
import FeedLayout from '../components/feed-layout';

type Layouts = 'inbox' | 'feed';
const ACTIVE_LAYOUT: Layouts = 'inbox';

function useActiveLayout(): Layouts {
	const activeLayout = ACTIVE_LAYOUT as Layouts;
	return activeLayout;
}

const Home: NextPage = () => {
	const layout = useActiveLayout();
	switch(layout) {
		case 'inbox':
			return <InboxLayout />
		case 'feed':
		default:
			return <FeedLayout />
	}
}

export default Home

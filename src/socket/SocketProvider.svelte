<script lang="ts">
	import { setSocket } from './context';
	import { Socket } from './Socket';

	interface Props {
		children?: import('svelte').Snippet;
		url: string = 'ws://localhost:9980/';
	}

	let { children, url }: Props = $props();

	const socket = new Socket(url);
	socket.connect();

	setSocket(socket);
</script>

{@render children?.()}

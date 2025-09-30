<script lang="ts">
	import { setSocket } from './context';
	import { Socket } from './Socket';
	import { onMount } from 'svelte';
	
	interface Props {
		children?: import('svelte').Snippet;
		url?: string;
	}
	
	let { children, url = 'ws://localhost:9980/' }: Props = $props();
	
	let socket: Socket | null = $state(null);
	
	onMount(() => {
		socket = new Socket(url);
		socket.connect();
		setSocket(socket);
		
		return () => {
			socket?.disconnect();
		};
	});
</script>

{#if socket}
	{@render children?.()}
{/if}

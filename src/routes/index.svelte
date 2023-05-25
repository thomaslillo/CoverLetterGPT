<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    const result = writable('');
    let prompt1 = '';
    let prompt2 = '';
  
    const fetchResponse = async () => {
      const res = await fetch('/api/gpt3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt1, prompt2 })
      });
      const data = await res.json();
      result.set(data.response);
    }
</script>
  
<main>
    <h1>OpenAI GPT-3 Prompt</h1>
    <input type="text" bind:value={prompt1} placeholder="Enter prompt 1" />
    <input type="text" bind:value={prompt2} placeholder="Enter prompt 2" />
    <button on:click={fetchResponse}>Generate</button>
    <p>{$result}</p>
</main>
  
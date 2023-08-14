/* I don't how to annotate the return type of this function */
export function clickOutside(node: HTMLElement) {
    /* I totally took that code from https://svelte.dev/tutorial/actions */
    const handleClick = (event: Event) => {
        if (!node.contains(event.target as Node)) {
            node.dispatchEvent(new CustomEvent('clickoutside'));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}

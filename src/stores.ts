import { writable } from 'svelte/store';

export const notifications = writable([
    {text: 'Walk the dog.'},
    {text: 'Buy milk.'},
    {text: 'Cut the grass.'}
]);
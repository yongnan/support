# Mergerino



Let's say we have this initial state:

```js
const initial = {
  temperature: {
    value: 22,
    units: 'C'
  }
};
```

change a property:

```js
update({ value: 23 });
update({ units: 'F' });
```

To convert the value at the same time as changing the units:

```js
update({ value: 72, units: 'F' });
```

### Change value

```
merge({ value: 22, units: 'C' }, { value: 23 });
// result:
{ value: 23, units: 'C' }

merge({ value: 23, units: 'C' }, { comfortable: true })
// result:
{ value: 23, units: 'C', comfortable: true }
```

### Patching based on the current value

```
merge({ value: 22, units: 'C' }, { value: x => x + 1 }); // The function receives 22
// result:
{ value: 23, units: 'C' }
```

### Deep Patching

```
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: { value: 25 } }
);
// result:
{ air:   { value: 25, units: 'C' }, // now we didn't lose the units!
  water: { value: 84, units: 'F' }
```

Deep patching and function patching can also be used together:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air:  { value: x => x + 8 } }
);
// result:
{ air:   { value: 30, units: 'C' }, // increased the value by 8, didn't lose the units
  water: { value: 84, units: 'F' }
}
```

If we want to *avoid* deep patching and instead want to replace a property, we can use a function. Say we want to set `air` to `{ replaced: true }` without keeping `value` and `units`:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air:   () => ({ replaced: true }) } // use a function to replace the value
);
// result:
{ air:   { replaced: true },
  water: { value: 84, units: 'F' }
}
```

We can also use a function at the top level to produce a completely new result without keeping any of the previous values. This could be useful, for example, to re-initialize application state.

```js
merge(
  { ... }, // doesn't matter what the previous state was
  () => (
    { air:   { value: 22, units: 'C' },
      water: { value: 84, units: 'F' }
    }
  )
);
// result:
{ air:   { value: 22, units: 'C' },
  water: { value: 84, units: 'F' }
}
```

### [Deleting a property](https://meiosis.js.org/docs/05-meiosis-with-mergerino.html#deleting_a_property)

Finally, we can use `undefined` as a property value when we wish to delete that property:

```js
merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: undefined }
);
// result:
{ water: { value: 84, units: 'F' } }

merge(
  { air:   { value: 22, units: 'C' },
    water: { value: 84, units: 'F' }
  },
  { air: { value: undefined } }
)
// result:
{ air:   { units: 'C' },
  water: { value: 84, units: 'F' }
}
```
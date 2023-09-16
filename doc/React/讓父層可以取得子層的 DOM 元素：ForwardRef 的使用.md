# [讓父層可以取得子層的 DOM 元素：ForwardRef 的使用](https://pjchender.blogspot.com/2021/03/react-dom-forwardref.html)

 [3月 08, 2021](https://pjchender.blogspot.com/2021/03/react-dom-forwardref.html)   [React](https://pjchender.blogspot.com/search/label/React) 

![imgur](https://1.bp.blogspot.com/-S5uXtl1yAtY/XRxfj1KIqMI/AAAAAAACGu0/G2AapHJ7jmMHzPALwLMojfLCPYs6z9k3ACLcBGAs/s1600/lU1Sb7v.png)

- 圖片來源：[Algolia blog](https://blog.algolia.com/how-we-unit-test-react-components-using-expect-jsx/)
- 內文資料來源：[Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html) @ React Docs

## 目的

有些時候父層的元件希望能夠取得子層的 DOM 元素（例如，button 或 input），以便能夠在父層控制子層 DOM 元素的 focus, selection 或 animation 的效果。這時就可以使用 **Ref forwarding** 來讓父層取得子層 DOM 元素，以便控制和操作它。

:::note
通常需要被 forwardRef 的子層元件會是封裝好的元件（例如，套件），其他使用它的開發者無法直接修改，因此才需要透過 forwardRef 把控制權交給父層元件，讓其他開發者可以直接控制。
:::

## forwardRef 基本使用

舉例來說，我們建立一個 AwesomeInput 元件：

```jsx
const AwesomeInput = (props) => <input type="text" />;
```

接著我們在父層 <App> 元件中使用 <AwesomeInput /> 元件：

```jsx
const App = () => {
  return <AwesomeInput />;
};
```

這時候如果想要在 App 元件得到 AwesomeInput 中 <input /> 的 value 或者是對它進行 focus 的動作，就需要透過 forwardRef 把這個 <input /> 傳到父層以供使用。

要讓 <App /> 可以操作到 <AwesomeInput /> 中的 <input /> 元素，需要：

### STEP 1：在父層元件建立 ref

- 先在父層元件透過 useRef 或 createRef 建立一個 ref，這裡取名作 awesomeInputRef
- 把建立好的 awesomeInputRef 透過 ref 屬性傳到 <AwesomeInput /> 元件內

```jsx
const App = () => {
  const awesomeInputRef = React.useRef(null);

  return <AwesomeInput ref={awesomeInputRef} />;
};
```

### STEP 2：在 AwesomeInput 使用 forwardRef

接著在 <AwesomeInput /> 元件中，可以使用 React.forwardRef() 來把 <AwesomeInput /> 內的 <input /> 傳出去：

- 一般的 React Component 是不會取得 ref 的屬性，需要被 React.forwardRef() 包起來的才會有 ref 屬性：

```jsx
const AwesomeInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});
```

### STEP 3：在 App 可以使用 AwesomeInput 中的 input DOM 元素

這時候，就可以直接在 App 中操作 AwesomeInput 中的 <input /> 元素，舉例來說，我們希望做到 autoFocus 的效果，就可以在 <App /> 元件中，透過 awesomeInputRef 取得裡面的 <input /> 元素：

```jsx
const App = () => {
  const awesomeInputRef = React.useRef(null);

  // App mounted 的時候讓 AwesomeInput 中的 input 元素 focus
  React.useEffect(() => {
    console.log(awesomeInputRef.current); // <input type="text">...</input>
    awesomeInputRef.current.focus(); // 對 AwesomeInput 中的 <input /> 進行操作
  }, []);

  return <AwesomeInput ref={awesomeInputRef} />;
};
```

## 在 HOC 中使用 forwardRef

現在假設建立一個名為 logPropsHOC 的 Higher Order Component（HOC），單純是把元件的 props 有改變時 console 出來的作用：

```jsx
const logPropsHOC = (WrappedComponent) => {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props: ', prevProps);
      console.log('new props: ', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
};
```

這時候，如果我們把上面寫過的 AwesomeInput 元件用此 HOC 包起來後再使用：

```jsx
const AwesomeInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

const AwesomeInputWithLogProps = logPropsHOC(AwesomeInput);
```

接著在 App 中使用 AwesomeInputWithLogProps：

```jsx
const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    console.log(awesomeInputRef.current); // <input type="text">...</input>
    // awesomeInputRef.current.focus(); // 對 AwesomeInput 中的 <input /> 進行操作
  }, []);

  return <AwesomeInputWithLogProps ref={awesomeInputRef} />;
};
```

這時候會發現 awesomeInputRef.current 的對象變成是該 HOC 元件，也就是 LogProps，而不像原本一樣能夠指稱到 AwesomeInput 元件中的 <input /> 元素。

為什麼會這樣呢？這是因為，雖然我們有在 LogProps 中有試著用：

```javascript
return <WrappedComponent {...this.props} />;
```

把所有的 props 都帶回到原本的元件中，但**因為 ref 並不是 prop，所以在 props 中並沒有 ref 的內容，進而不會傳遞到 AwesomeInput 元素中**。

即使在 AwesomeInput 元件包了 HOC 後，為了要讓 App 元件還是能夠取得 AwesomeInput 元件中的 <input />，我們需要在 HOC 中一樣先透過 React.forwardRef 取出 ref 後，再把它傳遞到被 HOC 包覆起來的 WrappedComponent 中，具體來說可以這樣做：

### STEP 1：將 HOC 回傳的元件也用 React.forwardRef

首先將 HOC 回傳的元件也用 React.forwardRef 取出 ref，接著再把這個 ref 傳到 LogProps 元件內：

```jsx
const logPropsHOC = (WrappedComponent) => {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props: ', prevProps);
      console.log('new props: ', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return React.forwardRef((props, ref) => <LogProps {...props} forwardedRef={ref} />);
};
```

:::caution
要留意的是 ref 是 React 元件的關鍵字，這裡如果單純只是要把 ref 當成 props 往下傳的話，不能用 ref 當名稱，因此這裡使用 forwardedRef 作為 props 的名稱。
:::

### STEP 2：從 props 中取出 forwardRef 並帶到下層的 ref

接著就可以從 props 中取出 forwardedRef 後，透過 ref 把它帶進去：

```jsx
const logPropsHOC = (WrappedComponent) => {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props: ', prevProps);
      console.log('new props: ', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => <LogProps {...props} ref={ref} />);
};
```

:::tip
留意 Component 使用 ref 時，是要使用 ref 的功能，還是只是要把父層的 ref 當層 props 往下傳遞，如果是要把 ref 當成 props 往下傳遞，就不能使用 ref 當作屬性名稱，而要換名字，例如 forwardedRef={ref}。
:::

## 針對 Class Component 使用 forwardRef

針對 Class Component 使用 forwardRef 的方式和 Function Component 非常相似。首先將原本的 AwesomeInput 元件改成 class component：

```jsx
class AwesomeInput extends React.Component {
  render() {
    return <input type="text" />;
  }
}
```

### STEP 1：透過 props 接受父層傳進來的 ref

由於要把 ref 當成 props 傳遞時，props 的名稱不能直接使用 ref，因此改名為 forwardedRef，並從 props 中取出：

```jsx
class AwesomeInput extends React.Component {
  render() {
    const { forwardedRef } = this.props;
    return <input type="text" ref={forwardedRef} />;
  }
}
```

:::note
Class Component 雖然能直接使用在元素的使用上使用 ref，但它會指稱到的是該 class 的 instance 而非 <input />。
:::

### STEP 2：使用 React.forwardRef 取出父層傳進來的 Ref，並以 props 往下傳遞

接著要使用 React.forwardRef 先取出父層傳入的 ref，並改名為 forwardedRef 後以 props 傳入 AwesomeInput 元件中：

```jsx
const AwesomeInputWithForwardRef = React.forwardRef((props, ref) => {
  // 把父層的 ref 透過 props 往下傳
  return <AwesomeInput forwardedRef={ref} {...props} />;
});
```

### STEP 3：在父層中可直接取用到 AwesomeInput 元件中的 input 元素

App 元素並不需要做什麼更改，即可取得 <AwesomeInput /> 元件中的 <input /> 元素：

```jsx
const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    console.log(awesomeInputRef.current); // <input type="text">...</input>
    awesomeInputRef.current.focus(); // 對 AwesomeInput 中的 <input /> 進行操作
  }, []);

  return <AwesomeInputWithForwardRef ref={awesomeInputRef} />;
};
```

## 幾種不同的變化型

若有需要在父層取得子層的 ref，React 在官方文件中的 [Exposing DOM Refs to Parent Components](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) 建議使用 React.forwardRef 的做法，但若你使用的是 React 16.2 以前的版本，或需要更彈性的用法，則直接把 ref 當成 props 直接傳到子層也是可行的，但 props 的名稱不能用 ref，需另外取名。

### Function Component：使用 React.forwardRef

- 直接在 JSX 的 Function Component 中使用 ref

```jsx
const AwesomeInput = React.forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    console.log(awesomeInputRef.current); // <input type="text">...</input>
    awesomeInputRef.current.focus(); // 對 AwesomeInput 中的 <input /> 進行操作
  }, []);

  // 直接在 JSX 的 Function Component 中使用 ref
  return <AwesomeInput ref={awesomeInputRef} />;
};
```

### Function Component：直接將 ref 當成 props 往下傳

- 在 JSX 的 Function Component 中，不用 ref 當屬性名稱，換成其他名稱後以 props 的方式往下傳（例如，forwardedRef）

```jsx
const AwesomeInput = (props) => {
  // 取用的是 forwardedRef
  return <input type="text" ref={props.forwardedRef} />;
};

const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    console.log(awesomeInputRef.current); // <input type="text">...</input>
    awesomeInputRef.current.focus(); // 對 AwesomeInput 中的 <input /> 進行操作
  }, []);

  // 將 ref 當成 props（不使用 ref 作為屬性名稱）往下傳
  return <AwesomeInput forwardedRef={awesomeInputRef} />;
};
```

### Class Component：直接使用 ref 往下傳

#### 錯誤寫法

- 雖然 class component 可以直接接收 ref 做為參數，但它會指稱到的是該 Component 的 instance 而不是 Component 內的 DOM 元素

```jsx
// 錯誤寫法：ref 會是 AwesomeInput 元件，而不是內部的 input 元素
class AwesomeInput extends React.Component {
  render() {
    const { ref } = this.props;
    return <input type="text" ref={ref} />;
  }
}

const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    // 這裡指稱到的會是 `<AwesomeInput />`
    console.log(awesomeInputRef.current); // <AwesomeInput />
  }, []);

  // 直接透過 ref 往下傳
  return <AwesomeInput ref={awesomeInputRef} />;
};
```

#### 使用 forwardRef

見上方段落「針對 Class Component 使用 forwardRef」的說明。

#### 可行寫法

```jsx
// 在 AwesomeInput 建立另一個 ref 以指稱到 input 元素
class AwesomeInput extends React.Component {
  innerRef = React.createRef();

  render() {
    return <input type="text" ref={this.innerRef} />;
  }
}

const App = () => {
  const awesomeInputRef = React.useRef(null);

  React.useEffect(() => {
    // 先指稱到 AwesomeInput 元件，再進去裡面找到 input 元素
    console.log(awesomeInputRef.current.innerRef.current);
  }, []);

  return <AwesomeInput ref={awesomeInputRef} />;
};
```
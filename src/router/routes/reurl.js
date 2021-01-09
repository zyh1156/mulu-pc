export default res => () =>
    import (`@/views/${res}.vue`)
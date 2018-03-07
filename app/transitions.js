export default function () {
  this.transition(
    this.debug(),
    this.fromRoute('lang.search'),
    this.toRoute('lang.make'),
    this.use('crossFade'),
    this.reverse('crossFade'),
  );
}

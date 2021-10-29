const deleteProduct = async (btn) => {
  const prodId = btn.parentNode.querySelector('[name=prodId]')?.value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]')?.value;
  const prod = btn.closest('article');
  const response = await fetch(`/admin/product/${prodId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  });
  if (response.ok) {
    prod.remove();
  }
};

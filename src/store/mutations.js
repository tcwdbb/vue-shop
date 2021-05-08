export default {
  setBreadcrumb(state, payLoad) {
    state.breadcrumbList = [];
    state.breadcrumbList.push(...payLoad);
  }
}


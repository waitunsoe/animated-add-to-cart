import { excerpt } from "./utilities";

export const createItemUi = ({id, image, title, description, price}) => {
  let itemDiv = document.createElement("div");
  itemDiv.classList.add("col-12", "col-md-5", "col-lg-4")
  itemDiv.innerHTML = `
                    <div class="card item-card h-100" item-id="${id}">
                        <div class="card-body">
                            <div class="mb-3">
                                <img src="${image}" alt="" class="item-img">
                            </div>
                            <p class="card-title fw-bold text-truncate">
                              ${title}
                            </p>
                            <p class="card-text small">
                              ${excerpt(description)}
                            </p>
                        </div>
                        <div class="card-footer bg-transparent border-0">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0 fw-bold">
                                    $<span class="">${price}</span>
                                </p>
                                <button class="btn btn-outline-primary add-to-cart">
                                    <i class="bi bi-cart-plus pe-none"></i>
                                    Add Cart
                                </button>
                            </div>
                        </div>
                    </div>
                  `;
  return itemDiv;
}
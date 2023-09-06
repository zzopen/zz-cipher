import {
  EVENT_SEARCH_SECRET_BOOK_DETAIL,
  EVENT_OPEN_UPDATE_SECRET_BOOK_DRAWER,
  EVENT_LOAD_SECRET_BOOK_LIST
} from './secret-book/event'

import {
  EVENT_CLICK_SECRET_CATEGORY_MENU_ITEM,
  EVENT_OPEN_CREATE_SECRET_CATEGORY_MODAL,
  EVENT_LOAD_SECRET_CATEGORY_MENU_LIST
} from './secret-category/event'

export type Events = {
  // secret-category
  [EVENT_CLICK_SECRET_CATEGORY_MENU_ITEM]: { secret_category_id: string }
  [EVENT_OPEN_CREATE_SECRET_CATEGORY_MODAL]: unknown
  [EVENT_LOAD_SECRET_CATEGORY_MENU_LIST]: unknown
  // secret-book
  [EVENT_SEARCH_SECRET_BOOK_DETAIL]: { secret_book_id: string }
  [EVENT_OPEN_UPDATE_SECRET_BOOK_DRAWER]: { secret_book_id: string }
  [EVENT_LOAD_SECRET_BOOK_LIST]: { secret_category_id: string }
}
package secretbook

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"zz-cipher/cipher/internal/logic/secretbook"
	"zz-cipher/cipher/internal/svc"
	"zz-cipher/cipher/internal/types"
)

func ListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.SecretBookListReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := secretbook.NewListLogic(r.Context(), svcCtx)
		resp, err := l.List(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}

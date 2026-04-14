# Makefile

# Tự động hóa việc cập nhật và đẩy code (Quick Save)
save:
	git add .
	@read -p "Enter commit message: " msg; \
	git commit -m "$$msg"; \
	git push origin $$(git rev-parse --abbrev-ref HEAD)

# Tổ hợp merge an toàn: Cập nhật master rồi mới merge vào branch hiện tại
sync:
	git checkout master
	git pull origin master
	git checkout -
	git merge master

# Kết thúc task: Commit hết, đẩy lên và báo hoàn thành
done:
	git add .
	git commit -m "final: wrap up task"
	git push origin $$(git rev-parse --abbrev-ref HEAD)

# Câu lệnh dọn dẹp (Dùng: make clean)
clean:
	git fetch --prune
	git branch -d $(shell git branch --merged | grep -v '^*' | grep -v 'main' | grep -v 'master')

# Hiển thị danh sách các lệnh có sẵn
help:
	@echo "Supported commands:"
	@echo "  make save m='message' : Save and push"
	@echo "  make sync             : Sync with main"
	@echo "  make clean            : Clean up merged branches"
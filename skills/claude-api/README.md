# Claude API

> Claude API 使用示例

## 功能

提供 Claude API 调用的示例代码和最佳实践。

## 内容

- 基础调用示例
- 流式响应处理
- 错误处理
- 速率限制处理

## 使用方法

参考示例代码，根据实际需求调整参数。

## 示例代码

```python
from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(response.content)
```

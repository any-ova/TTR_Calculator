import asyncio
import aiohttp
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from asgiref.sync import async_to_sync

@csrf_exempt
@require_http_methods(["POST"])
def calculate_ttr(request):
    data = json.loads(request.body)
    items = data.get('items', [])
    order_id = data.get('order_id')

    async_to_sync(calculate_ttr_async)(items, order_id)

    return JsonResponse({
        "status": "scheduled",
        "order_id": order_id
    }, status=202)


async def calculate_ttr_async(items, order_id):
    print(f"Task started: order_id={order_id}")

    await asyncio.sleep(5)

    total_words = sum(item.get('words', 0) for item in items)
    total_unique = sum(item.get('unique_words', 0) for item in items)
    ttr = float(total_unique) / float(total_words) * 100 if total_words > 0 else 0.0

    webhook_data = {
        "order_id": order_id,
        "total_words": total_words,
        "total_unique_words": total_unique,
        "ttr_percent": round(ttr, 2),
        "wh_token": "secret-async-token"
    }

    async with aiohttp.ClientSession() as session:
        async with session.put(
                "http://localhost:8080/api/ttr-calculation/webhook",
                json=webhook_data,
                timeout=aiohttp.ClientTimeout(total=10)
        ) as resp:
            print(f"Webhook sent: {resp.status} order_id={order_id}")

    print(f"TTR done: order_id={order_id}, ttr={ttr:.2f}%")

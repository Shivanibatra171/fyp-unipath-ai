import 'package:flutter_test/flutter_test.dart';
import 'package:unipath_app/main.dart';

void main() {
  testWidgets('UniPath App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const UniPathApp());
    expect(find.byType(UniPathApp), findsOneWidget);
  });
}
